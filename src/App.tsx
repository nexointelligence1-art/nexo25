import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowRight, BadgeCheck, Check, ChevronDown, Heart, Menu, Search, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Star, TrendingUp, X } from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  tag?: string
  store: string
  colors: string
}

const products: Product[] = [
  {
    id: 9,
    name: 'Samsung Galaxy A07',
    category: 'Eletrônicos',
    price: 674,
    oldPrice: 899,
    rating: 4.6,
    reviews: 1280,
    image: 'photo-1511707171634-5f897ff02aa9',
    tag: 'OFERTA',
    store: 'Mercado Livre',
    colors: 'Smartphone Samsung Galaxy A07'
  },
  {
    id: 10,
    name: 'Fone Bluetooth TWS Kaidi KD-771',
    category: 'Eletrônicos',
    price: 59,
    oldPrice: 99,
    rating: 4.5,
    reviews: 890,
    image: 'photo-1590658268037-6bf12165a8df',
    tag: 'ACHADO',
    store: 'Mercado Livre',
    colors: 'Fone Bluetooth TWS branco'
  },
]

const categories = [
  { name: 'Tudo', emoji: '✳' },
  { name: 'Eletrônicos', emoji: '⌁' },
  { name: 'Casa & cozinha', emoji: '⌂' },
  { name: 'Moda', emoji: '◌' },
  { name: 'Beleza', emoji: '✿' },
  { name: 'Esporte', emoji: '↗' },
]

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const imageUrl = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`

function App() {
  const [category, setCategory] = useState('Tudo')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('nexo-favorites') || '[]') as number[] } catch { return [] }
  })
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sort, setSort] = useState('Recomendados')
  const [mobileMenu, setMobileMenu] = useState(false)

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      localStorage.setItem('nexo-favorites', JSON.stringify(next))
      return next
    })
  }

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === 'Tudo' || product.category === category
      const matchesQuery = `${product.name} ${product.category} ${product.store}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery && (!favoritesOnly || favorites.includes(product.id))
    })
    if (sort === 'Menor preço') result.sort((a, b) => a.price - b.price)
    if (sort === 'Maior desconto') result.sort((a, b) => ((b.oldPrice ?? b.price) - b.price) - ((a.oldPrice ?? a.price) - a.price))
    if (sort === 'Melhor avaliados') result.sort((a, b) => b.rating - a.rating)
    return result
  }, [category, query, sort, favorites, favoritesOnly])

  const scrollToDeals = () => document.getElementById('achados')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell">
      <div className="announcement"><Sparkles size={14} /><span>Curadoria esperta. Compra mais leve.</span><span className="announcement-sep">·</span><span>Novos achados todos os dias</span></div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Nexo, início"><span className="brand-mark">n<span>.</span></span><span className="brand-name">nexo</span></a>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <a className="nav-link active" href="#achados" onClick={() => setMobileMenu(false)}>Descobrir</a>
          <a className="nav-link" href="#categorias" onClick={() => setMobileMenu(false)}>Categorias</a>
          <button className={`nav-link favorites-nav ${favoritesOnly ? 'selected' : ''}`} onClick={() => { setFavoritesOnly(!favoritesOnly); scrollToDeals(); setMobileMenu(false) }}><Heart size={16} fill={favoritesOnly ? 'currentColor' : 'none'} /> {favoritesOnly ? 'Ver todos' : 'Meus favoritos'} <span>{favorites.length}</span></button>
        </nav>
        <div className="header-actions">
          <button className="header-heart" aria-label="Ver favoritos" onClick={() => { setFavoritesOnly(!favoritesOnly); scrollToDeals() }}><Heart size={19} /><span>{favorites.length}</span></button>
          <button className="mobile-toggle" aria-label="Abrir menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A internet tem muita coisa. A gente filtra.</div>
            <h1>Seu próximo<br />bom achado <span>tá aqui<span className="title-dot">.</span></span></h1>
            <p className="hero-description">Produtos que valem a pena, selecionados por gente de verdade. Sem caça ao tesouro — só boas escolhas.</p>
            <div className="hero-actions"><button className="button-primary" onClick={scrollToDeals}>Explorar achados <ArrowRight size={17} /></button><div className="social-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>10 mil+</strong><small>pessoas economizando</small></div></div></div>
            <div className="hero-footnote"><ShieldCheck size={15} /> Achados selecionados. Compra segura direto na loja.</div>
          </div>
          <div className="hero-art" aria-label="Seleção de produtos em destaque">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="hero-photo"><img src={imageUrl('photo-1490312278390-ab64016e0aa9')} alt="Ambiente acolhedor com design contemporâneo" /><div className="photo-shade" /></div>
            <div className="hero-sticker"><span>ACHADO<br />DA SEMANA</span><Sparkles size={18} /></div>
            <div className="floating-card price-float"><span className="float-icon"><TrendingUp size={17} /></span><span><small>Tá valendo muito</small><strong>até 40% OFF</strong></span></div>
            <div className="floating-card community-float"><span className="community-icon"><Heart size={17} fill="currentColor" /></span><span><small>A comunidade amou</small><strong>4.9 <Star size={12} fill="currentColor" /></strong></span></div>
            <div className="hero-caption"><span className="caption-line" /><span>Pequenos achados, grandes favoritos.</span></div>
          </div>
          <div className="hero-decor decor-a">✳</div><div className="hero-decor decor-b">✦</div>
        </section>

        <section className="trust-strip" aria-label="Por que comprar com a Nexo">
          <div className="trust-item"><span className="trust-icon mint"><BadgeCheck size={19} /></span><span><strong>Curadoria de verdade</strong><small>Sem produto aleatório por aqui</small></span></div>
          <span className="trust-divider" />
          <div className="trust-item"><span className="trust-icon peach"><ArrowDownUp size={18} /></span><span><strong>Preço que faz sentido</strong><small>A gente compara pra você</small></span></div>
          <span className="trust-divider" />
          <div className="trust-item"><span className="trust-icon lavender"><ShieldCheck size={18} /></span><span><strong>Compra sem susto</strong><small>Você compra direto na loja</small></span></div>
          <div className="trust-note"><span className="live-dot" /> atualizado hoje</div>
        </section>

        <section className="catalog-section" id="achados">
          <div className="section-heading"><div><div className="section-kicker">A gente garimpou pra você</div><h2>Achados que <span>valem o clique.</span></h2><p>Boas descobertas, preços honestos e aquele “era isso que eu precisava”.</p></div><button className={`saved-button ${favoritesOnly ? 'saved-active' : ''}`} onClick={() => setFavoritesOnly(!favoritesOnly)}><Heart size={16} fill={favoritesOnly ? 'currentColor' : 'none'} /> {favoritesOnly ? 'Ver todos' : 'Meus favoritos'} <span>{favorites.length}</span></button></div>
          <div className="catalog-toolbar" id="categorias">
            <div className="category-list" role="tablist" aria-label="Categorias de produtos">{categories.map((item) => <button key={item.name} role="tab" aria-selected={category === item.name} className={`category-chip ${category === item.name ? 'category-active' : ''}`} onClick={() => { setCategory(item.name); setFavoritesOnly(false) }}><span>{item.emoji}</span>{item.name}</button>)}</div>
            <div className="toolbar-controls"><label className="search-box"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou loja" /></label><button className="sort-button" type="button"><SlidersHorizontal size={15} /> <span>{sort}</span> <ChevronDown size={14} /></button></div>
          </div>
          <div className="results-line"><span>{favoritesOnly ? 'SEUS FAVORITOS' : 'SELECIONADOS PRA VOCÊ'}</span><span>{filtered.length} {filtered.length === 1 ? 'achado' : 'achados'}</span></div>
          {filtered.length > 0 ? <div className="product-grid">{filtered.map((product) => {
            const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
            const favorite = favorites.includes(product.id)
            return <article className="product-card" key={product.id}><div className="product-image-wrap"><img className="product-image" src={imageUrl(product.image)} alt={product.colors} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}<button className={`heart-button ${favorite ? 'heart-active' : ''}`} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button><span className="discount-badge">-{discount}%</span></div><div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating} <small>({product.reviews.toLocaleString('pt-BR')})</small></span></div><h3>{product.name}</h3><div className="old-price">{money(product.oldPrice ?? product.price)}</div><div className="price-line"><strong>{money(product.price)}</strong><span>no Pix</span></div><div className="installments">ou 3x de {money(product.price / 3)} sem juros</div><div className="product-bottom"><span className="store-name"><span className="store-dot" /> {product.store}</span><a className="buy-button" href={
              product.id === 9 ? 'https://meli.la/1hbjCgP' :
              product.id === 10 ? 'https://meli.la/2Jza2Ax' :
              `https://www.google.com/search?q=${encodeURIComponent(`${product.name} ${product.store}`)}`
            } target="_blank" rel="noreferrer" aria-label={`Buscar ${product.name} na loja ${product.store}`}>Ver achado <ArrowRight size={14} /></a></div></div></article>
          })}</div> : <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><h3>Nenhum achado por aqui (ainda).</h3><p>Tente outra busca ou escolha uma categoria diferente.</p><button className="button-primary" onClick={() => { setQuery(''); setCategory('Tudo'); setFavoritesOnly(false) }}>Ver todos os achados <ArrowRight size={16} /></button></div>}
          <div className="catalog-footer"><span><Check size={14} /> Preços e disponibilidade podem mudar na loja.</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>De volta ao topo <ArrowRight size={14} /></button></div>
        </section>

        <section className="newsletter"><div className="newsletter-spark">✳</div><div className="newsletter-copy"><span className="newsletter-label">Uma boa dica nunca é demais</span><h2>Achados bons de verdade.</h2><p>Compras inteligentes, selecionadas com cuidado.</p></div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">n<span>.</span></span><span className="brand-name">nexo</span></a><p>Boas descobertas, preços honestos e aquele “era isso que eu precisava”.</p><div className="affiliate-note"><ShoppingBag size={13} /> Alguns links podem gerar comissão pra gente — sem custo extra pra você.</div></footer>
    </div>
  )
}

export default App

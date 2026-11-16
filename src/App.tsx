import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowRight, BadgeCheck, Check, Heart, Search, ShieldCheck, ShoppingBag, Sparkles, Star, TrendingUp } from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice: number
  rating: number
  reviews: number
  image: string
  tag: string
  store: string
  colors: string
  url: string
}

// O catálogo fica restrito aos dois produtos enviados.
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
    colors: 'Smartphone Samsung Galaxy A07',
    url: 'https://meli.la/1hbjCgP',
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
    colors: 'Fone Bluetooth TWS branco',
    url: 'https://meli.la/2Jza2Ax',
  },
]

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const imageUrl = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`

function App() {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('nexo-favorites') || '[]') as number[] } catch { return [] }
  })
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      localStorage.setItem('nexo-favorites', JSON.stringify(next))
      return next
    })
  }

  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.category} ${product.store}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (!favoritesOnly || favorites.includes(product.id))
  }), [query, favorites, favoritesOnly])

  const scrollToDeals = () => document.getElementById('achados')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell">
      <div className="announcement"><Sparkles size={14} /><span>Curadoria esperta. Compra mais leve.</span><span className="announcement-sep">·</span><span>Dois achados selecionados</span></div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Nexo, início"><span className="brand-mark">n<span>.</span></span><span className="brand-name">nexo</span></a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a className="nav-link active" href="#achados">Descobrir</a>
          <a className="nav-link" href="#categorias">Eletrônicos</a>
          <button className={`nav-link favorites-nav ${favoritesOnly ? 'selected' : ''}`} onClick={() => { setFavoritesOnly(!favoritesOnly); scrollToDeals() }}><Heart size={16} /> Favoritos</button>
        </nav>
        <div className="header-actions"><button className="header-heart" aria-label="Ver favoritos" onClick={() => { setFavoritesOnly(!favoritesOnly); scrollToDeals() }}><Heart size={19} /><span>{favorites.length}</span></button></div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A internet tem muita coisa. A gente filtra.</div>
            <h1>Seu próximo<br />bom achado <span>tá aqui<span className="title-dot">.</span></span></h1>
            <p className="hero-description">Selecionamos estes dois produtos para você: ofertas em eletrônicos com preço especial.</p>
            <div className="hero-actions"><button className="button-primary" onClick={scrollToDeals}>Ver os produtos <ArrowRight size={17} /></button><div className="social-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>2 achados</strong><small>selecionados pra você</small></div></div></div>
            <div className="hero-footnote"><ShieldCheck size={15} /> Compra segura direto na loja.</div>
          </div>
          <div className="hero-art" aria-label="Produtos selecionados">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="hero-photo"><img src={imageUrl(products[0].image)} alt={products[0].colors} /><div className="photo-shade" /></div>
            <div className="hero-sticker"><span>ACHADOS<br />SELECIONADOS</span><Sparkles size={18} /></div>
            <div className="floating-card price-float"><span className="float-icon"><TrendingUp size={17} /></span><span><small>Ofertas de até</small><strong>40% OFF</strong></span></div>
            <div className="floating-card community-float"><span className="community-icon"><Heart size={17} fill="currentColor" /></span><span><small>Avaliação média</small><strong>4.6 <Star size={13} fill="currentColor" /></strong></span></div>
            <div className="hero-caption"><span className="caption-line" /><span>Dois bons achados, sem perder tempo.</span></div>
          </div>
          <div className="hero-decor decor-a">✳</div><div className="hero-decor decor-b">✦</div>
        </section>

        <section className="trust-strip" aria-label="Por que comprar com a Nexo">
          <div className="trust-item"><span className="trust-icon mint"><BadgeCheck size={19} /></span><span><strong>Curadoria de verdade</strong><small>Só os produtos da sua lista</small></span></div>
          <span className="trust-divider" />
          <div className="trust-item"><span className="trust-icon peach"><ArrowDownUp size={18} /></span><span><strong>Preço que faz sentido</strong><small>Ofertas selecionadas</small></span></div>
          <span className="trust-divider" />
          <div className="trust-item"><span className="trust-icon lavender"><ShieldCheck size={18} /></span><span><strong>Compra sem susto</strong><small>Você compra direto na loja</small></span></div>
          <div className="trust-note"><span className="live-dot" /> atualizado hoje</div>
        </section>

        <section className="catalog-section" id="achados">
          <div className="section-heading"><div><div className="section-kicker">A gente garimpou pra você</div><h2>Achados que <span>valem o clique.</span></h2><p>Confira os dois produtos selecionados.</p></div><button className={`saved-button ${favoritesOnly ? 'saved-active' : ''}`} onClick={() => setFavoritesOnly(!favoritesOnly)}><Heart size={16} fill={favoritesOnly ? 'currentColor' : 'none'} /> {favoritesOnly ? 'Ver todos' : 'Meus favoritos'} <span>{favorites.length}</span></button></div>
          <div className="catalog-toolbar" id="categorias">
            <div className="category-list" role="tablist" aria-label="Categoria de produtos"><button role="tab" aria-selected="true" className="category-chip category-active"><span>⌁</span>Eletrônicos</button></div>
            <div className="toolbar-controls"><label className="search-box"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nos produtos..." /></label></div>
          </div>
          <div className="results-line"><span>{favoritesOnly ? 'SEUS FAVORITOS' : 'SELECIONADOS PRA VOCÊ'}</span><span>{filtered.length} {filtered.length === 1 ? 'achado' : 'achados'}</span></div>
          {filtered.length > 0 ? <div className="product-grid">{filtered.map((product) => {
            const discount = Math.round((1 - product.price / product.oldPrice) * 100)
            const favorite = favorites.includes(product.id)
            return <article className="product-card" key={product.id}><div className="product-image-wrap"><img className="product-image" src={imageUrl(product.image)} alt={product.colors} loading="lazy" /><span className="product-tag">{product.tag}</span><button className={`heart-button ${favorite ? 'heart-active' : ''}`} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button><span className="discount-badge">-{discount}%</span></div><div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating} <small>({product.reviews.toLocaleString('pt-BR')})</small></span></div><h3>{product.name}</h3><div className="old-price">{money(product.oldPrice)}</div><div className="current-price">{money(product.price)}</div><div className="payment-note">no Pix</div>{product.id === 9 && <div className="installment-note">ou 3x de R$ 224,67 sem juros</div>}<div className="product-bottom"><span className="store-name">{product.store}</span><a className="deal-link" href={product.url} target="_blank" rel="noreferrer" aria-label={`Ver ${product.name} na loja ${product.store}`}>Ver achado <ArrowRight size={14} /></a></div></div></article>
          })}</div> : <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><h3>Nenhum achado por aqui (ainda).</h3><p>Tente outra busca ou veja todos os produtos.</p><button className="button-primary" onClick={() => { setQuery(''); setFavoritesOnly(false) }}>Ver todos os achados <ArrowRight size={16} /></button></div>}
          <div className="catalog-footer"><span><Check size={14} /> Preços e disponibilidade podem mudar na loja.</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>De volta ao topo <ArrowRight size={14} /></button></div>
        </section>

        <section className="newsletter"><div className="newsletter-spark">✳</div><div className="newsletter-copy"><span className="newsletter-label">Uma boa dica nunca é demais</span><h2>Achados bons de verdade.</h2><p>Produtos selecionados para facilitar sua próxima compra.</p></div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">n<span>.</span></span><span className="brand-name">nexo</span></a><p>Boas descobertas, preços honestos.</p><div className="affiliate-note"><ShoppingBag size={13} /> Alguns links podem gerar comissão pra gente — sem custo extra pra você.</div></footer>
    </div>
  )
}

export default App

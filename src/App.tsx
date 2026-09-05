import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ChevronRight, CircleHelp, House, MapPin, ReceiptText, Search, ShoppingBag, SlidersHorizontal, Sparkles, UserRound, WalletCards, X } from 'lucide-react'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { brands, stores } from './data/marketplaceMockData'
import { marketplaceApi } from './services/marketplaceApi'
import type { EmiPlan, Product, ShopTab } from './types/marketplace'

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

function BottomNav() {
  const navigate = useNavigate(); const { pathname } = useLocation()
  const items = [{ label: 'Home', icon: House, to: '/' }, { label: 'Shop', icon: ShoppingBag, to: '/shop' }, { label: 'EMI Dues', icon: ReceiptText, to: '/emi-dues' }, { label: 'Limit', icon: SlidersHorizontal, to: '/limit' }, { label: 'Profile', icon: UserRound, to: '/profile' }]
  return <nav className="bottom-dock">{items.map(({ label, icon: Icon, to }) => { const active = pathname.startsWith(to === '/' ? '/home' : to) || (to === '/shop' && pathname.startsWith('/product')); return <button key={label} onClick={() => navigate(to)} className={active ? 'nav-active' : ''}><Icon size={25} strokeWidth={active ? 2.4 : 1.8} /><span>{label}</span></button> })}</nav>
}

function Shell({ children, dock = true }: { children: React.ReactNode; dock?: boolean }) { return <main className="app-frame"><div className="app-content">{children}</div>{dock && <BottomNav />}</main> }

function Hero() { return <section className="hero"><div className="hero-copy"><span><Sparkles size={15} /> NO-COST EMIs</span><h1>Shop today,<br /><em>Pay later using</em><br />Mutual funds.</h1><p>No credit score required. No interest.<br />Backed by your investments.</p></div><div className="hero-art"><div>⌁</div><span>⌑</span><b>✦</b><i>◒</i></div></section> }

const TabControl = ({ active, setActive }: { active: ShopTab; setActive: (tab: ShopTab) => void }) => <div className="shop-tabs">{([['brands', 'Top Brands'], ['stores', 'Nearby Stores'], ['marketplace', 'Marketplace']] as [ShopTab, string][]).map(([id, label]) => <button key={id} onClick={() => setActive(id)} className={active === id ? 'selected' : ''}>{label}</button>)}</div>
const SearchInput = ({ placeholder = 'Search products...' }: { placeholder?: string }) => <label className="search"><Search size={21} /><input placeholder={placeholder} /></label>

function BrandList() { return <section className="shop-section"><h2>Top Brands</h2>{brands.map(([name, subtitle, color]) => <article className="merchant-card" key={name}><div className="merchant-logo" style={{ background: color }}>{name === 'Apple Premium Reseller' ? '●' : name.split(' ')[0]}</div><div><h3>{name}</h3><p>{subtitle}</p></div><ChevronRight size={20} /></article>)}</section> }
function StoreList() { return <section className="shop-section"><div className="section-heading"><h2>Nearby Stores</h2><button className="location-pill">Ludhiana⌄</button></div>{stores.map(([name, address, distance, logo]) => <article className="merchant-card store-card" key={name}><div className="merchant-logo store-logo">{logo}</div><div><h3>{name}</h3><p>{address}</p></div><span className="distance">{distance}</span></article>)}</section> }

function ProductCard({ product }: { product: Product }) { return <Link to={`/product/${product.id}`} className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /></div><div className="product-card-body"><p className="brand">{product.brand}</p><h3>{product.name}</h3><p className="price">{money(product.price)}</p><span className="emi-copy">No-cost EMI from {money(Math.ceil(product.price / 18))}/mo</span></div></Link> }
function MarketplaceList() {
  const { data, isPending, isError, error, refetch } = useQuery({ queryKey: ['products'], queryFn: marketplaceApi.getProducts })
  const [term, setTerm] = useState('')
  const visible = useMemo(() => data?.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term.toLowerCase())) ?? [], [data, term])
  return <section className="marketplace"><div className="marketplace-title"><div><p className="eyebrow">1FI MARKETPLACE</p><h2>Shop top products</h2><p>Pay in easy, no-cost EMIs.</p></div><div className="badge-circle">0%</div></div><label className="search"><Search size={21} /><input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search products..." /></label>{isPending && <div className="status-card">Loading products…</div>}{isError && <div className="status-card error"><CircleHelp size={22} /><p>{error.message}</p><button onClick={() => refetch()}>Try again</button></div>}{data && <><div className="category-row"><span>All</span><span>Smartphones</span><span>Laptops</span><span>Audio</span></div><div className="product-grid">{visible.map((product) => <ProductCard product={product} key={product.id} />)}</div>{visible.length === 0 && <div className="status-card">No products match “{term}”.</div>}</>}</section>
}

function ShopPage() { const [active, setActive] = useState<ShopTab>('brands'); return <Shell><Hero /><div className="shop-body"><TabControl active={active} setActive={setActive} />{active !== 'marketplace' && <SearchInput placeholder={active === 'brands' ? 'Search online stores...' : 'Search stores...'} />}{active === 'brands' && <BrandList />}{active === 'stores' && <StoreList />}{active === 'marketplace' && <MarketplaceList />}</div></Shell> }

function ProductDetail() {
  const { id } = useParams(); const navigate = useNavigate(); const { data: product, isPending, isError } = useQuery({ queryKey: ['product', id], queryFn: () => marketplaceApi.getProduct(id!) })
  const [variantId, setVariantId] = useState<string>(); const [plan, setPlan] = useState<EmiPlan>(); const [complete, setComplete] = useState(false)
  if (isPending) return <Shell dock={false}><div className="detail-loading">Loading product…</div></Shell>
  if (isError || !product) return <Shell dock={false}><div className="detail-loading">Product unavailable.<button onClick={() => navigate('/shop')}>Back to Shop</button></div></Shell>
  const selectedVariant = product.variants.find((item) => item.id === variantId) ?? product.variants[0]
  const plans = product.emiPlans.map((item) => ({ ...item, monthlyAmount: Math.ceil(selectedVariant.price / item.months), totalAmount: selectedVariant.price }))
  const selectedPlan = plan && plans.find((item) => item.id === plan.id)
  return <Shell dock={false}><header className="detail-header"><button onClick={() => navigate('/shop')} aria-label="Back"><ArrowLeft /></button><b>Pay using 1Fi</b></header><div className="product-detail"><div className="detail-image"><img src={product.image} alt="" /></div><p className="brand">{product.brand}</p><h1>{product.name}</h1><p className="detail-price">{money(selectedVariant.price)}</p><p className="no-cost"><Sparkles size={16} /> No-cost EMI. No interest.</p><hr /><section><h2>Choose a variant</h2><div className="choice-row">{product.variants.map((item) => <button key={item.id} onClick={() => setVariantId(item.id)} className={(selectedVariant.id === item.id) ? 'choice selected-choice' : 'choice'}>{item.name}<strong>{money(item.price)}</strong></button>)}</div></section><section><div className="plan-heading"><h2>Select EMI plan</h2><span>0% interest</span></div><div className="plan-list">{plans.map((item) => <button key={item.id} onClick={() => setPlan(item)} className={selectedPlan?.id === item.id ? 'plan selected-plan' : 'plan'}><div><strong>{item.months} months</strong><small>No-cost EMI</small></div><div><strong>{money(item.monthlyAmount)}<small>/month</small></strong>{item.badge && <em>{item.badge}</em>}</div></button>)}</div></section><section className="details"><h2>Product details</h2>{product.highlights.map((point) => <p key={point}>• {point}</p>)}</section></div><div className="sticky-cta">{selectedPlan ? <div><small>Your monthly EMI</small><strong>{money(selectedPlan.monthlyAmount)} × {selectedPlan.months} months</strong></div> : <span>Select an EMI plan</span>}<button disabled={!selectedPlan} onClick={() => setComplete(true)}>Continue <ChevronRight size={20} /></button></div>{complete && <div className="modal-backdrop"><div className="confirmation"><button className="modal-close" onClick={() => setComplete(false)}><X /></button><div className="confirmation-icon">✓</div><h2>Plan selected</h2><p>{product.name} on {selectedPlan?.months}-month no-cost EMI.</p><div><span>Monthly EMI</span><b>{money(selectedPlan?.monthlyAmount ?? 0)}</b></div><button onClick={() => navigate('/shop')}>Done</button></div></div>}</Shell>
}

function Placeholder({ title, subtitle }: { title: string; subtitle: string }) { return <Shell><div className="placeholder"><div className="placeholder-icon"><WalletCards /></div><h1>{title}</h1><p>{subtitle}</p></div></Shell> }
function App() { return <Routes><Route path="/" element={<Placeholder title="Good evening" subtitle="Your 1Fi experience starts here." />} /><Route path="/shop" element={<ShopPage />} /><Route path="/product/:id" element={<ProductDetail />} /><Route path="/emi-dues" element={<Placeholder title="EMI Dues" subtitle="Your upcoming EMIs will appear here." />} /><Route path="/limit" element={<Placeholder title="Available Limit" subtitle="Your mutual-fund backed limit will appear here." />} /><Route path="/profile" element={<Placeholder title="Profile" subtitle="Your account details will appear here." />} /></Routes> }
export default App

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Product from "@/models/product/Product";
import "@/models/brand/Brand";
import "@/models/category/Category";
import db from "@/lib/db";
import AddToCart from "@/components/shop/product/AddToCart";
import ProductGallery from "@/components/shop/product/ProductGallery";
import ProductReview from "@/components/shop/product/ProductReview";
//
type ProductPageProps = { params: Promise<{ slug: string }> };

type ProductDetails = {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string | null;
  price: number;
  discount?: number | null;
  unit: string;
  quantity: number;
  status: string;
  image?: { url?: string };
  brand?: { name?: string };
  category?: { name?: string };
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  tags?: string[] | null;
  averageRating?: number;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

async function getProductBySlug(slug: string): Promise<ProductDetails | null> {
  await db();
  const product = await Product.findOne({ slug })
    .populate("brand", "name")
    .populate("category", "name")
    .lean();

  if (!product) return null;
  return JSON.parse(JSON.stringify(product)) as ProductDetails;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found | কৃষি পন্য",
      robots: { index: false, follow: false },
    };
  }

  const title = product.metaTitle || product.name;
  const description =
    product.metaDescription || product.shortDescription || product.description;
  const canonicalUrl = `${siteUrl}/products/${product.slug}`;

  return {
    title,
    description,
    keywords: product.keywords || product.tags || undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: product.image?.url
        ? [{ url: product.image.url, alt: product.name }]
        : undefined,
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const discount =
    product.discount && product.discount > 0 ? product.discount : null;
  const discountedPrice = discount
    ? product.price - (product.price * discount) / 100
    : product.price;
  const productForCart = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    price: discountedPrice,
    unit: product.unit,
    imageUrl: product.image?.url,
    quantity: product.quantity,
    status: product.status,
  };
  //
  return (
    <main className="py-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-[#1f7a1f]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="transition hover:text-[#1f7a1f]">
            {product.category?.name || "Products"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-16">
          <ProductGallery
            productName={product.name}
            images={product.image?.url ? [product.image.url] : []}
          />

          <article className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1f7a1f]">
              {product.category?.name || "Agriculture"}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#163b1b] sm:text-5xl uppercase">
              {product.name}
            </h1>
            {product.averageRating !== undefined &&
              product.averageRating > 0 && (
                <p className="mt-4 text-sm font-medium text-[#8a5a00]">
                  ★ {product.averageRating.toFixed(1)} / 5
                </p>
              )}
            {product.sku && (
              <p className="mt-4 text-sm text-gray-500">SKU: {product.sku}</p>
            )}

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-[#163b1b]">
                ৳{discountedPrice.toLocaleString()}
              </span>
              <span className="text-gray-500">per {product.unit}</span>
              {discount && (
                <span className="rounded-full bg-[#fff3d6] px-3 py-1 text-sm font-semibold text-[#8a5a00]">
                  {discount}% off
                </span>
              )}
            </div>
            {discount && (
              <p className="mt-1 text-sm text-gray-500 line-through">
                ৳{product.price.toLocaleString()}
              </p>
            )}

            <p
              className={`mt-6 font-semibold ${product.status === "In Stock" ? "text-[#1f7a1f]" : "text-[#a33b26]"}`}
            >
              {product.status}
              {product.quantity > 0
                ? ` · ${product.quantity} ${product.unit} available`
                : ""}
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {product.shortDescription || product.description}
            </p>

            <AddToCart product={productForCart} />

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#dcebdc] pt-6 text-sm">
              <div>
                <p className="text-gray-500">Brand</p>
                <p className="mt-1 font-semibold text-[#163b1b]">
                  {product.brand?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="mt-1 font-semibold text-[#163b1b]">
                  {product.category?.name || "N/A"}
                </p>
              </div>
            </div>
            <h2 className="mt-5">Recomend for you</h2>
            <div className="grid grid-cols-4 gap-x-2">
              {[1, 2, 3, 4].map((item, i) => {
                return (
                  <div key={i} className="bg-[#F5F5F5] text-center">
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <section className="mt-16 max-w-3xl border-t border-[#dcebdc] pt-8">
          <h2 className="text-2xl font-bold text-[#163b1b]">Product details</h2>
          <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
            {product.description}
          </p>
        </section>
        <ProductReview />
      </div>
    </main>
  );
}

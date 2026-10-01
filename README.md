# 🕉️ Manakamana Pooja Samagri Bhandar — मनकामना पूजा सामग्री भण्डार

Website for **Manakamana Pooja Samagri Bhandar**, a puja and religious goods
shop in Gaindakot-5, Nawalpur, Nepal.

**Live site:** https://amitrayamajhi.github.io/manakamana-pooja-website/

![Link preview](images/og-image.jpg)

## What the site does

- **Nepali first, with English** at the tap of a button (ने / EN)
- **Product catalogue** of 200+ items in 14 categories (bells, idols, diyas,
  kalash, thali, incense, mala and more)
- **Order on WhatsApp:** every product has an Order button that opens
  WhatsApp with a ready-made message naming the item
- Shop address, phone, opening hours and a Google Map
- Works on phones and computers; a proper preview card appears when the link
  is shared on WhatsApp or Facebook

It's plain HTML, CSS and JavaScript. There's nothing to install or build.

## Updating the site

Edit the files on GitHub (open the file → ✏️ pencil icon → **Commit
changes**). The live site updates by itself within a minute or two.

| To change… | Edit |
| --- | --- |
| Products, prices, photos | `js/products.js` |
| Phone (WhatsApp) number and email | the top of `js/script.js` |
| Shop story, address, opening hours, any page text | `index.html` |
| Colours and layout | `css/style.css` |

### Products and prices

Each product in `js/products.js` is one line:

```js
{ en: "Brass Puja Handheld Bell", ne: "पित्तलको पूजा हाते घन्टी", price: "Rs. 3,000/KG", img: "images/products/brass-hate-ghanti.jpg" },
```

- `price`: leave it as `""` and the site shows "मूल्यको लागि सम्पर्क
  गर्नुहोस्" / "Contact for price" automatically.
- `img` is optional. Upload a square-ish photo (ideally under 200 KB) to
  `images/products/` and put its path here. Without a photo, the category
  icon is shown.

### Text in both languages

Any text with `data-en="…"` and `data-ne="…"` switches language with the
toggle. Change both when you edit it.

### Shop story (About section)

The About section has a commented-out spot in `index.html` (search for
`TO ADD YOUR SHOP'S STORY`) for 2–3 lines about the shop. It stays hidden until
you add it.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `css/style.css` | Styles |
| `js/products.js` | Product list (generated from the shop's inventory sheet) |
| `js/script.js` | Language toggle, menu, product tabs, WhatsApp links |
| `images/logo.jpg` | Shop logo |
| `images/og-image.jpg` | Picture shown when the link is shared |
| `images/shop-qr-code.png` | QR code that opens the website. Print it for the shop counter or bags. |

## Hosting

Hosted free on GitHub Pages from the `main` branch (**Settings → Pages**).

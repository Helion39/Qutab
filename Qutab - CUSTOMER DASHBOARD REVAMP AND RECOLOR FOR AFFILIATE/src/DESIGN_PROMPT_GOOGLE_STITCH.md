# Customer Dashboard Design Brief - Qurban Tanpa Batas

## Project Overview

Design a modern, clean e-commerce dashboard for an Islamic Qurban (sacrifice) platform called "Qurban Tanpa Batas". This is a customer-facing dashboard where Muslims can browse, select, and purchase sacrificial animals for Eid al-Adha. The platform emphasizes three core values: Ekonomis (Economical), Mudah (Easy), and Memberdayakan Peternak Nusantara (Empowering Indonesian Farmers).

## Visual Direction

Create a modern e-commerce dashboard that feels fresh, trustworthy, and approachable. The design should use white as the primary background color throughout the interface to create a clean, spacious feel. Use accent colors sparingly and strategically - specifically dfdffa (a soft lavender) and ef9bb8 (a muted rose) - to highlight important elements, interactive components, and call-to-action buttons without overwhelming the clean white base. Think of designs like Shopify, Notion, or Linear where white space is used generously and accent colors appear thoughtfully rather than dominantly.

The overall aesthetic should feel contemporary and professional, similar to modern SaaS dashboards, while maintaining warmth appropriate for a religious and community-focused service. Avoid heavy, dark themes or overly colorful designs. The interface should breathe with plenty of white space, subtle shadows for depth, and gentle transitions between sections.

## Layout Structure

The dashboard uses a two-column layout with a fixed left sidebar and a main content area that fills the remaining screen space. The sidebar remains visible at all times, providing consistent navigation, while the main content area scrolls independently. Above the main content is a top header bar that spans the full width of the content area and contains search functionality, notifications, and a shopping cart icon.

The left sidebar is approximately 280 pixels wide and contains the Qurban Tanpa Batas brand identity at the top with a simple icon representing charity or sacrifice. Below the branding, the navigation menu is divided into two sections. The primary navigation includes Dashboard (home overview), Katalog Produk (product catalogue), Daftar Keinginan (wishlist), and Riwayat Pesanan (order history). Below this, separated by a subtle divider and a small "Pengaturan" (Settings) label, are secondary navigation items including Pengaturan Akun (account settings) and Pusat Bantuan (help center). At the very bottom of the sidebar is a user profile section showing the customer's photo, name, membership tier status, and a logout button.

The top header bar sits just above the main content and provides contextual information and quick actions. On the left side are breadcrumb navigation showing the current page hierarchy. On the right side are three key elements: a search input field for finding products, a notification bell icon with a badge indicator, and a shopping cart icon that also displays the number of items currently in the cart.

## Product Categories

The catalogue focuses exclusively on six specific product categories, and these should be prominently featured in the filtering system on the catalogue page. The categories are Kambing (goat), Domba (sheep), Sapi (whole cow), Sapi 1/7 (shared cow for seven people), Qurban Sedekah (charity qurban for those in need), and Tabungan Qurban (qurban savings program). Each category should have its own filter button or tab that customers can use to narrow their browsing. Do not include any other animal types or categories beyond these six.

## Dashboard Home Page

When customers first log in, they land on the dashboard home page which provides an overview of their account activity and quick access to important actions. At the top is a personalized welcome message greeting the customer by name. Below this are summary cards displaying key metrics such as total orders placed, pending orders awaiting payment, and completed qurban transactions.

The middle section shows a list or cards of active orders with their current status - whether they're awaiting payment, being processed, or scheduled for sacrifice. Each order card should show the animal type, recipient name (Shohibul Qurban), price, and a clear status indicator.

Below the active orders are quick action buttons that provide shortcuts to browse the catalogue or check the shopping cart. If there are current promotions or special offers, a promotional banner can appear at the bottom of the page, but this should be optional and not clutter the main overview.

## Catalogue Page

The catalogue page is where customers browse and select animals for purchase. At the top is a page title "Katalog Qurban 2024" with a brief description explaining that all animals come from trusted local farmers and meet both health and syariah requirements.

Immediately below the header is a horizontal row of filter buttons for the six product categories. These filters should be visually distinct when active versus inactive, making it clear which category the customer is currently viewing. There should also be an "All" option to show all available animals.

The main content area displays products in a responsive grid layout - showing perhaps three to four products per row on desktop screens. Each product card contains a large product image of the animal, the animal name and type, a small badge indicating the category (like "TYPE A" or "SHARE"), the weight or size specification, the location of the farmer or livestock group, and the price prominently displayed. Each card also has a heart icon for adding to wishlist and a primary action button to view details or add to cart.

For products that are verified from trusted farmers, show a verification badge. For bestselling items, show a popularity indicator. If an item is out of stock, the card should appear slightly dimmed with an overlay indicating unavailability.

## Product Detail Page

When a customer clicks on a product from the catalogue, they navigate to a detailed product page. This page uses a two-column layout on desktop. The left column contains a large, high-quality image gallery of the animal. The right column contains all the product information and purchasing controls.

At the top of the right column is the product name in a large, bold heading, followed by the category badge, weight specification, and farmer location. Below this is the stock status and price displayed prominently.

The most important element on this page is the Shohibul Qurban input field. This is where customers enter the name of the person for whom the sacrifice is being made - this name will be read aloud during the ritual sacrifice. The input should have a clear label "Nama Shohibul Qurban" and helper text explaining that this is the recipient name that will be used during the sacrifice ceremony. This field is required before adding the item to the cart.

Below the Shohibul Qurban input are two action buttons: "Tambah ke Keranjang" (Add to Cart) as a secondary action and "Beli Langsung" (Buy Now) as the primary action that takes customers directly to checkout.

Further down the page are detailed sections about the product including a full description, health information confirming the animal has been vaccinated and is disease-free, and syariah compliance details confirming it meets Islamic requirements for age and physical condition.

## Shopping Cart Page

The cart page shows all items the customer has selected for purchase. If the cart is empty, display a centered empty state with an icon, message "Keranjang Kosong" (Empty Cart), and a button to browse the catalogue.

When the cart contains items, use a two-column layout. The left column (taking up about two-thirds of the width) displays the cart items. Each item shows a thumbnail image, product name and type, the Shohibul Qurban name that was entered (which can be edited directly in the cart), the price, and a remove button.

The right column contains an order summary card that sticks to the top of the viewport as the user scrolls. This summary shows the subtotal for all items, notes that coupon discounts can be applied at checkout, and displays the current total. Below the summary is a large, prominent "Lanjut Checkout" (Proceed to Checkout) button and a secondary "Lanjut Belanja" (Continue Shopping) button.

## Checkout Page

The checkout page is where customers finalize their purchase before being sent to the payment gateway. The page uses a similar two-column layout with forms on the left and order summary on the right.

The left column contains several sections. First is customer information where fields for full name, email, and WhatsApp number are pre-filled from the user's profile but can be edited. There's also an optional address field for distribution preferences.

Below that is a detailed order summary listing each purchased item with its image, name, type badge, and the Shohibul Qurban name. This allows customers to review that all recipient names are correct before payment.

The third section is for coupon code entry. Customers can enter a discount code, click an "Terapkan" (Apply) button, and see success or error messages. If a valid coupon is applied, the discount amount appears in the order summary.

At the bottom is a checkbox for agreeing to terms and conditions, followed by the main "Bayar Sekarang" (Pay Now) button. Below that is a small security indicator noting that payments are processed securely through Xendit.

The right column contains the order summary card showing subtotal, any applied discount, and the final total amount to pay.

## Order History Page

The order history page (accessible from "Riwayat Pesanan" in the sidebar) shows all of the customer's past and current orders. At the top are filter tabs to view All orders, Pending payment orders, Paid orders, and Completed orders.

Each order is displayed as a card or row showing the order number (formatted like "QTB-240116-0001"), order date, a brief description of items (like "1x Kambing Premium"), total amount paid, and a status badge. The status badge should be color-coded and clearly indicate whether the order is pending, paid, being processed, or completed.

When customers click on an order or expand it, they should see the full details including all items purchased with their respective Shohibul Qurban names, the payment method used, payment timestamp, and tracking information showing the progression from payment to processing to sacrifice to completion. For completed orders, there should be a button to download a digital certificate.

If there are no orders yet, show an empty state encouraging the customer to start shopping.

## Wishlist Page

The wishlist displays products that customers have saved for later purchase. Products appear in a similar grid layout to the catalogue, with each card showing the product image, name, type, location, price, and two action buttons: one to remove from wishlist and another to add to cart.

If the wishlist is empty, show an appropriate empty state message.

## Account Settings Page

The settings page is divided into several sections. The first section is personal information where customers can upload or change their profile photo, edit their full name (which should match their identity documents), view their email (read-only), and update their WhatsApp number for notifications.

The second section is for managing saved addresses, particularly for meat distribution preferences. Customers should be able to view a list of saved addresses and add new ones.

The third section covers security settings, specifically changing the account password. This should require entering the old password and confirming a new password.

The final section manages notification preferences with toggle switches for WhatsApp notifications and email notifications.

## Help Center Page

The help center provides customer support resources. It includes an FAQ section with an accordion-style list of common questions and answers, contact support options showing WhatsApp and email links for direct assistance, and optionally a knowledge base with links to helpful articles about the qurban process, syariah requirements, and how the platform works.

## Navigation Behavior and Interactive States

Throughout the dashboard, the active navigation item in the sidebar should be clearly highlighted to show customers where they are. When hovering over navigation items, buttons, or clickable cards, subtle visual feedback should indicate interactivity - this could be through gentle color shifts, slight scale changes, or shadow adjustments.

The shopping cart icon in the top header should display a badge with the number of items in the cart. This badge should be attention-grabbing but not garish, perhaps using one of the accent colors.

Status badges throughout the interface (for order status, stock availability, verification marks) should use consistent color coding that's intuitive - for example, green tones for completed or available, yellow/orange for pending or processing, red for out of stock or failed.

## Typography and Content Hierarchy

Use clear typographic hierarchy throughout the interface. Page titles should be large and bold, section headings should be medium-weight and distinct from body text, and labels should be small but legible. Product names should stand out in catalogue grids and cart listings. Prices should always be bold and easy to scan.

Keep Indonesian language in mind - labels and buttons will use Indonesian text like "Tambah ke Keranjang", "Bayar Sekarang", "Shohibul Qurban", etc. Ensure sufficient space for these text strings which may be longer than English equivalents.

## Mobile Responsiveness

While the primary focus is on desktop layout, consider how the dashboard would adapt to mobile screens. The left sidebar would likely collapse into a hamburger menu, the two-column layouts would stack into single columns, product grids would show fewer items per row, and the sticky order summary cards would move below the main content or become fixed at the bottom of the screen.

## Special Considerations for Islamic Context

This platform serves a religious purpose, so the design should feel respectful and trustworthy. The Shohibul Qurban input field is not just a form field - it's a sacred element where customers enter the name that will be recited during a religious ritual. Give this field appropriate visual weight and clear labeling to convey its importance.

The overall tone should be warm and community-oriented while maintaining professionalism. This is both an e-commerce platform and a religious service, so strike a balance between modern web app aesthetics and the gravity of the religious practice it facilitates.

## Key User Flows to Design For

A typical user journey starts from logging in and landing on the dashboard home. From there, they navigate to the catalogue, filter by category, click on a specific animal to view details, enter the Shohibul Qurban name, add to cart, continue shopping or proceed to checkout, review their order and apply any discount codes, agree to terms, and click pay. After payment (handled externally by Xendit), they return to a success page showing their order number and next steps, with information about how they'll receive WhatsApp notifications when the sacrifice is performed and documentation is available.

Another important flow is checking order history to track the status of purchased qurbans and eventually downloading certificates for completed orders.

The design should make these flows feel natural and frictionless while ensuring customers don't miss critical steps like entering the Shohibul Qurban name or reviewing their order details before payment.

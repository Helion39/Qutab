# Customer Dashboard E-Commerce Requirements
**Qurban Tanpa Batas - Complete Customer Flow Specification**

---

## Project Context
- **Design**: Neobrutalism with Space Grotesk font, thick black borders, sharp rectangles
- **Colors**: Pink (#ffafcc), Lavender (#bdbef5), Blue accents
- **Tech Stack**: React + react-router-dom (NOT Next.js)
- **Payment**: Xendit integration
- **Key Feature**: Shohibul Qurban (recipient name) collected per product

---

## Current Status Assessment

### ✅ COMPLETED PAGES
- Landing page (full redesign)
- Login page (`/login`)
- Register page (`/register`)
- Social Media section
- Affiliate registration flow
- Affiliate dashboard (full functionality)
- Admin dashboard (with manual commission system)

### 🟡 PARTIALLY COMPLETE (Need Updates)
| Page | Route | Status | Issues |
|------|-------|--------|--------|
| **Catalogue** | `/dashboard/catalogue` | Hardcoded | No API integration, missing cart functionality |
| **Wishlist** | `/dashboard/wishlist` | Hardcoded | No API integration |
| **Payment/Orders** | `/dashboard/orders` | Hardcoded | Wrong name ("Payment" → "Order History"), no API |
| **Profile** | `/dashboard/profile` | Basic | Missing address book functionality |
| **Help** | `/dashboard/help` | Basic | Likely complete as-is |

### ❌ MISSING CRITICAL PAGES (Must Build)
| Priority | Page | Route | Purpose |
|----------|------|-------|---------|
| 🔴 HIGH | **Product Detail** | `/dashboard/product/:slug` | View product + add Shohibul Qurban |
| 🔴 HIGH | **Cart** | `/dashboard/cart` | Review items before checkout |
| 🔴 HIGH | **Checkout** | `/dashboard/checkout` | Apply coupon, confirm order, initiate payment |
| 🔴 HIGH | **Payment Success** | `/payment/success` | Confirm successful transaction |
| 🔴 HIGH | **Payment Failed** | `/payment/failed` | Handle failed payments |

---

## Detailed Page Specifications

### 1. REGISTRATION PAGE (`/register`)
**Purpose**: New customer account creation

**Form Fields**:
- ✅ Full Name (text, required)
- ✅ Email (email, required) - used for login
- ✅ WhatsApp (phone, required) - primary communication
- ✅ Password (min 8 chars, required)
- ✅ Confirm Password (must match, required)
- ✅ Terms Checkbox (required)

**Actions**:
- Primary: Register button → Submit form
- Alternative: Google Sign-Up (OAuth)
- Link: "Already have account? Login"

**Post-Registration**:
- Auto-login user
- Redirect to `/dashboard`
- No admin approval needed

---

### 2. LOGIN PAGE (`/login`)
**Purpose**: Customer authentication

**Form Fields**:
- Email (required)
- Password (required)
- Remember Me (optional checkbox)

**Actions**:
- Primary: Login button
- Alternative: Google Login (OAuth)
- Links:
  - "Forgot Password?" → Password reset flow
  - "Don't have account? Register" → `/register`

---

### 3. DASHBOARD HOME (`/dashboard`)
**Purpose**: Account overview and quick actions

**Content Sections**:
1. **Welcome Banner**: "Selamat Datang, [Name]!"
2. **Quick Stats**:
   - Total Orders: X
   - Pending Orders: X
   - Completed: X
3. **Active Orders**: List with status badges
4. **Quick Actions**:
   - "Lihat Katalog" → Catalogue
   - "Cek Keranjang" → Cart
5. **Promo Banner**: Optional promotions

---

### 4. CATALOGUE PAGE (`/dashboard/catalogue`)
**Purpose**: Browse Qurban animals

**Current Status**: 🟡 Exists but hardcoded, needs API integration

**Features Needed**:
- **Filter Bar**: Category filters (Semua, Kambing, Sapi Utuh, Patungan Sapi)
- **Search**: Search by name/location
- **Product Grid Cards**:
  - Image
  - Name
  - Type Badge (TYPE A, SHARE, etc.)
  - Weight
  - Location
  - Price
  - "Lihat Detail" button
  - "Tambah ke Keranjang" quick-add button
  - Wishlist heart icon toggle

**Actions**:
- Click product → Product Detail page
- Click heart → Add to Wishlist
- Click "Tambah" → Opens Shohibul Qurban modal OR goes to detail

---

### 5. 🔴 PRODUCT DETAIL PAGE (`/dashboard/product/:slug`)
**Status**: ❌ DOES NOT EXIST - MUST CREATE

**Purpose**: View full product info and add to cart with recipient details

**Layout Sections**:

#### A. Product Gallery
- Large image(s) of the animal

#### B. Product Information
- Name: "Kambing Premium Type A"
- Type Badge: Category indicator
- Weight: "~25-28 kg"
- Origin: "West Java Farmers Group"
- Price: "Rp 2.500.000"
- Stock Status: "Tersedia" or "Habis"

#### C. Description
- Full description
- Health information
- Syariah compliance details

#### D. ⭐ Shohibul Qurban Input (CRITICAL)
- **Label**: "Nama Shohibul Qurban"
- **Input**: Text field (e.g., "Bapak Ahmad")
- **Helper Text**: "Masukkan nama lengkap orang yang akan dikurbankan"
- **Note**: This is the recipient name read during sacrifice

#### E. Quantity
- Number input (if applicable for shares)

#### F. Action Buttons
- **Primary**: "Tambah ke Keranjang" → Add to cart
- **Secondary**: "Beli Langsung" → Go straight to checkout

#### G. Related Products
- Optional: Similar products carousel

**Important Backend Notes**:
- Shohibul Qurban collected HERE so each item has its own recipient
- Backend stores this per OrderItem, not per Order

---

### 6. 🔴 CART PAGE (`/dashboard/cart`)
**Status**: ❌ DOES NOT EXIST - MUST CREATE

**Purpose**: Review selected items before checkout

**Content Sections**:

#### Empty State
- Message: "Keranjang kosong"
- Button: "Lihat Katalog" → Back to catalogue

#### Cart Items (if items exist)
For each item, display:
- **Image**: Thumbnail
- **Product Name**: With type badge
- **Shohibul Qurban**: ✏️ Editable text field (can be changed here)
- **Price**: Per item
- **Remove Button**: "Hapus" or trash icon

#### Summary Panel
- **Subtotal**: Sum of all items
- **Coupon Input**: 
  - Text field + "Terapkan" button
  - Success/error messages
- **Discount**: Shown if coupon applied
- **Total**: Final amount (subtotal - discount)

#### Actions
- **Primary**: "Lanjut Checkout" → Checkout page
- **Secondary**: "Lanjut Belanja" → Back to catalogue

**Technical Notes**:
- Cart state stored in localStorage or Context until checkout
- Each cart item contains:
  - `productId`
  - `productName`
  - `price`
  - `shohibulQurban` (editable)

---

### 7. 🔴 CHECKOUT PAGE (`/dashboard/checkout`)
**Status**: ❌ DOES NOT EXIST - MUST CREATE

**Purpose**: Final review, contact details, coupon application, and payment initiation

**Layout Sections**:

#### Section A: Customer Information
| Field | Type | Notes |
|-------|------|-------|
| Nama Lengkap | Text | Pre-filled from profile |
| Email | Email | Pre-filled, for invoice |
| WhatsApp | Phone | Pre-filled, for updates |
| Alamat | Textarea | Optional: Distribution preference |

#### Section B: Order Summary
| Column | Content |
|--------|---------|
| Produk | Name + Shohibul Qurban |
| Harga | Per item price |
| Subtotal | Calculated sum |
| Diskon | If coupon applied |
| **TOTAL** | **Final amount to pay** |

#### Section C: Coupon Application
- **Input**: Text field for coupon code
- **Button**: "Terapkan"
- **Validation**: Via `POST /commissions/coupons/{code}/validate/`
- **Success Message**: "Kupon berhasil! Diskon: Rp X"
- **Error Message**: "Kupon tidak valid" or "Kupon sudah expired"

#### Section D: Terms & Payment
- **Checkbox**: "Saya menyetujui syarat & ketentuan" (required)
- **Primary Button**: "Bayar Sekarang"

**On Submit Flow**:
1. Validate all fields
2. Create order via `POST /orders/` (returns Xendit payment URL)
3. Redirect customer to Xendit payment page

**WHY Collect Data Before Xendit**:
- Xendit hosted payment page has limited customization
- Cannot add custom fields (like Shohibul Qurban)
- Can only customize: logo, company name, colors
- All data MUST be collected in our checkout page

---

### 8. XENDIT PAYMENT (External)
**Status**: Third-party integration

**Customer Flow**:
1. Redirected to Xendit's hosted payment page
2. Select payment method (VA, E-Wallet, QRIS, etc.)
3. Complete payment
4. Xendit redirects back to our success/failure URL

**After Payment**:
- Success: Redirect to `success_redirect_url` → `/payment/success`
- Failure: Redirect to `failure_redirect_url` → `/payment/failed`

---

### 9. 🔴 PAYMENT SUCCESS PAGE (`/payment/success`)
**Status**: ❌ DOES NOT EXIST - MUST CREATE

**Purpose**: Confirm successful payment and show order details

**Content**:
- ✅ Success Icon: Green checkmark animation
- ✅ Title: "Pembayaran Berhasil!"
- ✅ Order Number: "QTB-240116-XXXX"
- ✅ Summary: List of purchased items with Shohibul Qurban names
- ✅ Next Steps: "Anda akan menerima notifikasi via WhatsApp saat hewan dikurbankan"

**Actions**:
- **Primary**: "Lihat Pesanan" → `/dashboard/orders`
- **Secondary**: "Kembali ke Katalog" → `/dashboard/catalogue`

---

### 10. 🔴 PAYMENT FAILED PAGE (`/payment/failed`)
**Status**: ❌ DOES NOT EXIST - MUST CREATE

**Purpose**: Handle failed/cancelled payments

**Content**:
- ❌ Failed Icon: Red X or warning icon
- ❌ Title: "Pembayaran Gagal"
- ❌ Message: "Transaksi dibatalkan atau gagal diproses"

**Actions**:
- **Primary**: "Coba Lagi" → Back to `/dashboard/checkout`
- **Secondary**: "Hubungi CS" → Help page

---

### 11. ORDER HISTORY PAGE (`/dashboard/orders`)
**Current Status**: 🟡 Exists as "Payment" in sidebar (wrong name)

**Issues**:
- ❌ Currently named "Payment" → Should be "Riwayat Pesanan" or "Order History"
- ❌ Hardcoded data, needs API integration

**Purpose**: View all past and current orders

**Features Needed**:

#### Filter Tabs
- Semua
- Pending
- Dibayar
- Selesai

#### Order List
For each order, show:
- **Order Number**: QTB-XXXXXX
- **Date**: "16 Jan 2024"
- **Items**: "1x Kambing Premium"
- **Total**: "Rp 2.500.000"
- **Status Badge**: Pending/Paid/Processing/Completed
- **Action**: "Lihat Detail" (expand or modal)

#### Empty State
- Message: "Belum ada pesanan"
- Button: "Lihat Katalog"

#### Order Detail Expansion/Modal
| Field | Content |
|-------|---------|
| Shohibul Qurban | Name(s) submitted for each item |
| Payment Method | "BCA Virtual Account" |
| Paid At | Timestamp |
| Tracking | Status updates (Dibayar → Diproses → Disembelih → Selesai) |
| Certificate | Download button (if completed) |

---

### 12. WISHLIST PAGE (`/dashboard/wishlist`)
**Current Status**: 🟡 Exists but hardcoded

**Issues**:
- ❌ No API integration

**Purpose**: Saved products for later purchase

**Features Needed**:
- Product cards (same as catalogue)
- "Remove from wishlist" button
- "Tambah ke Keranjang" button
- Empty state: "Belum ada produk di wishlist"

---

### 13. PROFILE/SETTINGS PAGE (`/dashboard/profile`)
**Current Status**: 🟡 Basic version exists

**Issues**:
- ❌ Missing address book functionality

**Sections Needed**:

#### Personal Info
- Foto Profil (avatar upload)
- Nama Lengkap (editable)
- Email (read-only)
- WhatsApp (editable)

#### Address Book (MISSING)
- Distribution Addresses (list of saved addresses)
- "Add New Address" button → Form

#### Security
- Change Password (old + new password)

#### Notifications
- WhatsApp updates (toggle)
- Email updates (toggle)

---

### 14. HELP CENTER PAGE (`/dashboard/help`)
**Current Status**: 🟢 Likely complete

**Features**:
- FAQ Accordion
- Contact Support (WhatsApp, Email)
- Knowledge Base links

---

## Implementation Priority

### Phase 1: Core E-Commerce Flow (CRITICAL)
Must be completed to have a functional shop:

1. **Product Detail Page** (`/dashboard/product/:slug`)
   - Product gallery and info
   - Shohibul Qurban input
   - Add to cart functionality

2. **Cart Page** (`/dashboard/cart`)
   - Display cart items
   - Edit Shohibul Qurban names
   - Apply coupon
   - Calculate totals

3. **Checkout Page** (`/dashboard/checkout`)
   - Customer info form
   - Order summary
   - Coupon validation
   - Create order and redirect to Xendit

4. **Payment Success Page** (`/payment/success`)
   - Success confirmation
   - Order details display
   - Next steps guidance

5. **Payment Failed Page** (`/payment/failed`)
   - Error handling
   - Retry options

### Phase 2: Update Existing Pages
Enhance pages that exist but need work:

6. **Catalogue Page** (update)
   - Connect to products API
   - Implement cart "add" functionality
   - Implement wishlist toggle

7. **Order History Page** (update)
   - Rename from "Payment" to "Riwayat Pesanan"
   - Connect to orders API
   - Display full order details with Shohibul Qurban

8. **Wishlist Page** (update)
   - Connect to wishlist API
   - Implement add to cart from wishlist

### Phase 3: Profile Enhancements
Nice-to-have improvements:

9. **Profile Page** (update)
   - Add address book functionality
   - Add address CRUD operations

---

## Key Technical Requirements

### State Management
- **Cart State**: localStorage or React Context
- **User Auth**: Token-based (localStorage/Context)
- **Form Validation**: React Hook Form recommended

### API Endpoints Needed
```
Products:
GET    /products/                      # List all products
GET    /products/{id}/                 # Get product detail

Cart:
GET    /cart/                          # Get current cart
POST   /cart/items/                    # Add item to cart
PATCH  /cart/items/{id}/               # Update item (e.g., Shohibul Qurban)
DELETE /cart/items/{id}/               # Remove item from cart

Orders:
POST   /orders/                        # Create order (returns Xendit URL)
GET    /orders/                        # Get order history
GET    /orders/{id}/                   # Get order detail

Coupons:
POST   /commissions/coupons/{code}/validate/  # Validate coupon

Wishlist:
GET    /wishlist/                      # Get wishlist
POST   /wishlist/items/                # Add to wishlist
DELETE /wishlist/items/{id}/           # Remove from wishlist
```

### Data Models

#### CartItem
```typescript
interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productType: string;
  price: number;
  shohibulQurban: string;  // ⭐ Recipient name
  quantity: number;
}
```

#### Order
```typescript
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerWhatsapp: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'completed';
  paymentMethod?: string;
  paidAt?: string;
  xenditUrl?: string;
}

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  shohibulQurban: string;  // ⭐ Recipient name per item
  quantity: number;
}
```

---

## Design Specifications

### Neobrutalism Style Guide
- **Typography**: Space Grotesk font
- **Borders**: Thick black borders (4-6px)
- **Corners**: Sharp rectangles, NO rounded corners
- **Shadows**: Solid offset shadows (not blur)
- **Colors**:
  - Primary Pink: `#ffafcc`
  - Secondary Lavender: `#bdbef5`
  - Accent Blues: Various shades for sections
  - Black: `#000000` for borders and text
  - White: `#ffffff` for backgrounds

### Component Patterns
- **Buttons**: Thick black border, solid shadow, uppercase text
- **Input Fields**: Black border, no rounded corners, clear labels
- **Cards**: Black border, subtle offset shadow
- **Badges**: Solid colors, black border, uppercase text
- **Modals**: Centered, thick border, white background

---

## Critical User Experience Notes

### Why Shohibul Qurban is Special
1. **Religious Significance**: The name read during the sacrifice ritual
2. **Per-Item Basis**: Each animal can have a different recipient
3. **Collected Early**: Must be gathered BEFORE Xendit payment
4. **Editable in Cart**: Users can change names before checkout
5. **Displayed in Orders**: Must appear in order history and receipts

### Payment Flow Constraints
- **Xendit Limitation**: Cannot add custom form fields in their hosted payment page
- **Solution**: Collect ALL data (including Shohibul Qurban) in our checkout page
- **Redirect**: After checkout, immediately redirect to Xendit
- **Return**: Xendit redirects back to our success/failed pages

---

## Testing Checklist

### Critical User Journeys
- [ ] Browse catalogue → View product detail
- [ ] Add product to cart with Shohibul Qurban name
- [ ] View cart and edit Shohibul Qurban name
- [ ] Apply valid coupon at checkout
- [ ] Complete checkout and redirect to Xendit
- [ ] Return from Xendit payment to success page
- [ ] View order in order history with correct Shohibul Qurban names
- [ ] Add product to wishlist
- [ ] Add wishlist item to cart
- [ ] Handle failed payment gracefully

---

## Questions to Clarify with Backend Team

1. **Cart Storage**: Is cart stored server-side or client-side?
2. **Xendit Integration**: Do we have webhook handlers for payment status updates?
3. **Coupon Validation**: What's the exact endpoint and response format?
4. **Order Creation**: Does POST /orders/ automatically create Xendit invoice?
5. **Certificate Generation**: When and how are certificates generated for completed orders?
6. **Wishlist API**: Is this implemented on backend?

---

## Notes from Previous Discussions

- ✅ Admin dashboard has manual commission system (not automatic)
- ✅ Customer login redirects to `/dashboard`
- ✅ Affiliate login redirects to `/affiliate/dashboard`
- ✅ Admin login redirects to `/admin/dashboard/*`
- ✅ Bank verification and payouts are manual in admin
- ✅ KTP upload has preview and confirmation flow
- ⚠️ Current customer dashboard identified as missing critical e-commerce components
- ⚠️ This specification document created to track all requirements

---

**Document Created**: January 16, 2026
**Last Updated**: January 16, 2026
**Status**: Planning phase - implementation pending

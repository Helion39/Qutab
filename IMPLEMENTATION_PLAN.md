# Admin Dashboard Implementation Plan

This plan outlines the steps to merge the approved `Qutab - CHECK THE ADMIN SECTION` codebase into the main `Qutab` project and integrate it with the backend.

## Phase 1: Migration & Setup
**Goal**: Move the files into the main project and set up the basic routing structure.

1.  **Create Directories**: [x]
    -   `src/pages/admin` (For the main page components)
    -   `src/components/admin` (For reusable admin UI components if any, or keep all in pages for now)
    -   `src/hooks/admin` (For API hooks)

2.  **Migrate Components**: [x]
    -   Copy `AdminLayout.tsx` -> `src/components/layouts/AdminLayout.tsx` (or `src/layouts/AdminLayout.tsx`)
    -   Copy `AdminDashboard.tsx` (The Router) -> `src/pages/admin/AdminDashboard.tsx`
    -   Copy `AdminDashboardHome.tsx` -> `src/pages/admin/AdminDashboardHome.tsx`
    -   Copy `AdminAffiliates.tsx` -> `src/pages/admin/AdminAffiliates.tsx`
    -   Copy `AdminBankVerification.tsx` -> `src/pages/admin/AdminBankVerification.tsx`
    -   Copy `AdminPayoutsNew.tsx` -> `src/pages/admin/AdminPayouts.tsx` (Rename to generic)
    -   Copy `AdminCustomers.tsx` -> `src/pages/admin/AdminCustomers.tsx`
    -   Copy `AdminOrders.tsx` -> `src/pages/admin/AdminOrders.tsx`
    -   Copy `AdminProducts.tsx` -> `src/pages/admin/AdminProducts.tsx`
    -   Copy `AdminSettings.tsx` -> `src/pages/admin/AdminSettings.tsx`
    -   Copy `AdminLogin.tsx` -> `src/pages/admin/AdminLogin.tsx`

3.  **Install Dependencies**: [x]
    -   Check if any missing deps (e.g. `MaterialIcon` availability). Ensure `MaterialIcon` component exists in main project or migrate it.

4.  **Update Routing (`App.tsx`)**: [x]
    -   Import `AdminLogin` and `AdminDashboard`.
    -   Add `/admin/login` route.
    -   Add `/admin/dashboard/*` route protected by a new `AdminRoute` guard.

## Phase 2: Authentication Integration
**Goal**: Secure the admin panel.

1.  **Create `AdminRoute` Guard**: [x]
    -   Check if user is logged in AND `user.role === 'admin'`.
    -   Redirect to `/admin/login` if not.

2.  **Integrate `AdminLogin.tsx`**: [x]
    -   Wire up the Login Form to `POST /api/auth/login`.
    -   On success, store token and redirect to `/admin/dashboard`.

## Phase 3: Affiliate Management Integration
**Goal**: Connect the verified manual payment flow to the backend.

1.  **Affiliate List (`AdminAffiliates.tsx`)**: [x]
    -   **Fetch**: `GET /api/affiliates/`
    -   **Approve/Reject**: `POST /api/affiliates/{id}/approve` or `reject`
    -   **Detail Modal**: wire up KTP display from backend data.
    -   **Add Balance**: `POST /api/affiliates/{id}/balance/add`
        -   Payload: `{ amount: 500000, reason: "Bonus" }`

2.  **Bank Verification (`AdminBankVerification.tsx`)**: [x]
    -   **Fetch**: `GET /api/bank-accounts?status=pending`
    -   **Verify**: `POST /api/bank-accounts/{id}/verify`
    -   **Reject**: `POST /api/bank-accounts/{id}/reject` (Reason required)

3.  **Payouts (`AdminPayouts.tsx`)**: [x]
    -   **Fetch**: `GET /api/payouts/`
    -   **Process (Mark Paid)**: `POST /api/payouts/{id}/confirm`
        -   Payload: `{ transaction_id: "TRX123", proof_image: ... }`
    -   **Reject**: `POST /api/payouts/{id}/reject`

## Phase 4: Order & Customer Management
**Goal**: Manage the core business data.

1.  **Orders (`AdminOrders.tsx`)**: [x]
    -   **Fetch**: `GET /api/orders/`
    -   **Update Status**: `PATCH /api/orders/{id}/status`
        -   (Pending -> Paid -> Processing -> Completed)

2.  **Customers (`AdminCustomers.tsx`)**: [x]
    -   **Fetch**: `GET /api/users/?role=customer`
    -   **Ban/Unban**: `POST /api/users/{id}/toggle-status`

3.  **Products (`AdminProducts.tsx`)**: [x]
    -   **Fetch**: `GET /api/products/`
    -   **Create/Update**: `POST /api/products/` or `PATCH /api/products/{id}`
    -   **Toggle Stock**: `PATCH /api/products/{id}/stock`

## Phase 5: Testing & Validation
**Goal**: Ensure the manual flows work as designed.

1.  **Test Affiliate Flow**: [ ] (Ready for Manual Testing)
    -   Register new affiliate -> Admin Approve.
    -   Affiliate adds Bank -> Admin Verify (Check KTP match).
    -   Affiliate requests Payout -> Admin Payout (Check KTP match again).
2.  **Test Order Flow**: [ ] (Ready for Manual Testing)
    -   Create Order -> Admin Mark Paid -> Admin Mark Processing -> Admin Mark Completed.
    -   Verify Commission is credited to Affiliate.

---

**Status**: Code Implementation Complete. Ready for Testing.

# Apartment Listing Platform

A web application designed to allow users to host, discover, and manage apartment listings. The platform provides safe user authentication, listing management, and search-ready property metadata.

---

## Key Features

- **User Authentication & Management:** Secure sign-up, login, and user profile management out of the box.
- **Property Listings:** Users can create, update, and manage apartment properties with custom details, capacity rules, and pricing.
- **Listing Lifecycle:** Status management for property entries (Draft, Published, Archived) to control public visibility.

---

## Data Model Overview

The core domain model revolves around user-owned apartment listings:

- **Users:** Account owners who hold permissions to create and manage their own listings.
- **Listings:** Primary domain table storing core listing attributes:
    - **Identity & Slug:** Unique identifiers and SEO-friendly slug routes.
    - **Property Attributes:** Title, detailed description, bedroom/bathroom counts, and guest capacities.
    - **State:** Lifecycles tracking listing status (`draft`, `published`, `archived`).

---

## Development Roadmap & Scalability

Planned modules to extend core platform capabilities:

1. **Media Management (**`listing_images`**):** Dedicated asset storage supporting multiple high-resolution images per listing with primary display toggles.
2. **Taxonomies & Amenities (**`amenities` **/ Pivot):** Many-to-many tag management for property features (e.g., Wi-Fi, Air Conditioning, Parking).
3. **Reservations & Bookings (**`bookings`**):** Scheduling engine handling check-in/check-out dates, availability calendars, and transaction calculations.
4. **Reviews & Ratings (**`reviews`**):** Feedback system allowing verified guests to leave ratings and comments on properties.

Listings:
⚬ id (bigserial / uuid) — Primary Key: Unique identifier.
⚬ user_id (foreignId) — Constrained to users.id, ON DELETE CASCADE: Establishes user ownership.
⚬ title (varchar(255)) — Required: Catchy title (e.g., "Cozy Downtown Studio").
⚬ slug (varchar(255)) — Unique, Indexed: Clean, SEO-friendly URL slug.
⚬ description (text) — Required: Full description of the listing.
⚬ price_per_night (decimal(8, 2) / integer) — Unsigned / Required: Rental price (store in cents/integers to avoid floating-point issues).
⚬ address_line_1 (varchar(255)) — Required: Street address.
⚬ city (varchar(100)) — Indexed: City location.
⚬ state_province (varchar(100)) — Nullable: State or region.
⚬ postal_code (varchar(20)) — Nullable: ZIP or postal code.
⚬ country_code (char(2)) — Required, Indexed: ISO 2-letter country code (e.g., 'US', 'BA').
⚬ latitude (decimal(10, 8)) — Nullable, Indexed: Map placement (PostgreSQL PostGIS extension can be added later).
⚬ longitude (decimal(11, 8)) — Nullable, Indexed: Map placement.
⚬ bedrooms (smallinteger) — Default 1: Number of bedrooms.
⚬ bathrooms (decimal(3, 1)) — Default 1.0: Allows half-baths (e.g., 1.5).
⚬ max_guests (smallinteger) — Default 1: Capacity limit.
⚬ status (varchar(20)) — Default 'draft': Lifecycle status (draft, published, archived).
⚬ created_at / updated_at (timestamp) — Nullable (Laravel default): Standard Laravel timestamps.

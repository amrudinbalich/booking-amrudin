# Booking API

## Introduction

This file contains foundational project notes from the developer.
It may contain decision notes, feature adding & documentation as well as the thinking decisions made during the development of a product.

## Branch Naming (Git - Version Management)

All core app changes that do not impact the end user and are not features are prefixed as `infra` ,
from other side - all branches (code extensions) that are made as app functionality features are named with `features` prefix.

## Application table schema

Application table schema is roughly designed in following manner:

1. prodji kroz tabele

users - OK
-id
-name
-email
-created_at
-updated_at

hosts

- id
- user_id (FK -> users.id)
- company_name
- status (e.g., active, pending_verification) (feature)
- created_at
- updated_at

apartments
-id

- host_id (FK -> hosts.id)
  -name
  -description
  -rent_price
  -active BOOL
  -created_at
  -updated_at

# Personalization Access Matrix

This matrix documents the current role/lens/level access policy used by `src/lib/accessControl.ts`.

## Global Behavior

- **Default profile** (`role=learner`, `level=intermediate`, no lenses): gating is disabled and frontend behaves as-is.
- Once role/level/lens is changed from default, gating is enforced for the modules below.

## Module Policy Matrix

| Module | Route(s) | Minimum Level | Allowed Roles | Lens Overrides |
|---|---|---|---|---|
| Knowledge Search | `/knowledge-search` | `intermediate` | `architect`, `data-engineer`, `operations`, `admin` | `technology-architect`, `data-engineering`, `infrastructure-operations` |
| Agents Console | `/agents` | `intermediate` | `architect`, `operations`, `admin` | `technology-architect`, `infrastructure-operations` |
| Adoption Playbook | `/adoption-playbook` | none | `executive`, `admin` | `executive-leader` |
| Adoption Forms | `/adoption/charter`, `/adoption/canvas`, `/adoption/briefing` | none | `executive`, `admin` | `executive-leader` |
| Velocity Workshop | `/velocity/workshop` | `intermediate` | `executive`, `architect`, `data-engineer`, `operations`, `admin` | none |

## Lens-Centric Matrix (All Lenses)

Assumes gating is enabled (profile changed from default).  
Legend: **Yes*** = lens grants access only if `minLevel` is also met.

| Lens | Knowledge Search | Agents Console | Adoption Playbook | Adoption Forms | Velocity Workshop |
|---|---|---|---|---|---|
| `executive-leader` | No (lens-only) | No (lens-only) | Yes | Yes | No (role-based only) |
| `technology-architect` | Yes* (`intermediate+`) | Yes* (`intermediate+`) | No | No | No (role-based only) |
| `data-engineering` | Yes* (`intermediate+`) | No | No | No | No (role-based only) |
| `infrastructure-operations` | Yes* (`intermediate+`) | Yes* (`intermediate+`) | No | No | No (role-based only) |

## Evaluation Rule

Access is granted when:

1. The user meets `minLevel` (if defined), **and**
2. The user matches an allowed `role` **or** one of the allowed `lenses` (when those are defined).

Implementation reference: `hasModuleAccess(profile, key)` in `src/lib/accessControl.ts`.

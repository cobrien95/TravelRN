/**
 * Role-Based Access Control (RBAC) Middleware
 *
 * Phase 1: Uses a simple x-user-role header stub for testing.
 * In production, this will validate a signed JWT and extract the role claim.
 */

import type { Request, Response, NextFunction } from "express";

// Must match the Prisma Role enum
export type Role = "NURSE" | "ADMIN" | "SYSTEM";

// Extend Express Request to include user context
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: Role;
            };
        }
    }
}

/**
 * Stub authentication middleware.
 * In Phase 1, reads role from the x-user-role header.
 * TODO: Replace with JWT verification in production.
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const role = req.headers["x-user-role"] as Role | undefined;
    const userId = req.headers["x-user-id"] as string | undefined;
    const userEmail = req.headers["x-user-email"] as string | undefined;

    if (!role || !userId) {
        res.status(401).json({
            error: "Unauthorized",
            message: "Missing authentication headers. Provide x-user-id and x-user-role.",
        });
        return;
    }

    const validRoles: Role[] = ["NURSE", "ADMIN", "SYSTEM"];
    if (!validRoles.includes(role)) {
        res.status(401).json({
            error: "Unauthorized",
            message: `Invalid role: ${role}. Must be one of: ${validRoles.join(", ")}`,
        });
        return;
    }

    req.user = {
        id: userId,
        email: userEmail || "",
        role,
    };

    next();
}

/**
 * Authorization middleware — restricts access to specific roles.
 * Must be used AFTER authenticate().
 *
 * @example
 *   router.get("/admin/dashboard", authenticate, requireRole("ADMIN"), handler);
 */
export function requireRole(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized", message: "Not authenticated." });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: "Forbidden",
                message: `Role '${req.user.role}' does not have access. Required: ${allowedRoles.join(" | ")}`,
            });
            return;
        }

        next();
    };
}

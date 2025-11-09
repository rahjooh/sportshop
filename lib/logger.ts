/**
 * Shared telemetry helper for lightweight client-side instrumentation.
 * Centralizing console output keeps the UI code readable and makes it trivial
 * to upgrade to a proper analytics sink later.
 */
export interface TelemetryEvent {
    name: string;
    context?: string;
    payload?: Record<string, unknown>;
}

/**
 * Logs interaction level events (e.g., slider navigation) with a timestamp.
 * In production this can fan out to a remote collector without touching callers.
 */
export function logClientEvent(event: TelemetryEvent): void {
    if (typeof window === 'undefined') {
        return;
    }

    const entry = {
        ...event,
        timestamp: new Date().toISOString()
    };

    // eslint-disable-next-line no-console -- intentional instrumentation surface.
    console.info('[پیتوک:event]', entry);
}

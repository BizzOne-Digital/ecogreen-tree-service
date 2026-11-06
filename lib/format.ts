export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "").slice(-10)}`;
export const lines = (value?: string) => (value ?? "").split("\n").map((l) => l.trim()).filter(Boolean);

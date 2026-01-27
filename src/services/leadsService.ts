
export interface Lead {
    id: string;
    name: string;
    phone: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
    email?: string;
}

const MOCK_LEADS: Lead[] = [
    { id: '1', name: 'John Smith', phone: '+1 555-123-4567', status: 'New', email: 'john.smith@example.com' },
    { id: '2', name: 'Emily Davis', phone: '+1 555-123-4567', status: 'New', email: 'emily.davis@example.com' }, // Status is 'New' but color might differ in UI logic or just use distinct statuses if needed.
    { id: '3', name: 'Michael Lee', phone: '+1 555-123-4567', status: 'Contacted', email: 'michael.lee@example.com' },
];

export const getLeads = async (): Promise<Lead[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_LEADS);
        }, 500);
    });
};

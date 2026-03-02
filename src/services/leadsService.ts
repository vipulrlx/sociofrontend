import API from "@/lib/axios";

export interface Lead {
    id: string | number;
    name: string;
    phone: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | string;
    email?: string;
    company?: string;
    followup_note?: string;
}

export const getLeads = async (): Promise<Lead[]> => {
    try {
        const { data } = await API.get("leads/");
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.results)) {
            return data.results;
        } else if (data && Array.isArray(data.data)) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch leads", error);
        return [];
    }
};

export const createLead = async (leadData: Partial<Lead>): Promise<Lead> => {
    try {
        const { data } = await API.post("createleads/", leadData);
        return data as Lead;
    } catch (error) {
        console.error("Failed to create lead", error);
        throw error;
    }
};

export const getLeadDetails = async (id: string | number): Promise<Lead> => {
    try {
        const { data } = await API.get(`leaddetails/${id}/`);
        return data as Lead;
    } catch (error) {
        console.error(`Failed to fetch lead details for ID ${id}`, error);
        throw error;
    }
};

export const updateLead = async (id: string | number, leadData: Partial<Lead>): Promise<Lead> => {
    try {
        const { data } = await API.put(`updatelead/${id}/`, leadData);
        return data as Lead;
    } catch (error) {
        console.error(`Failed to update lead ID ${id}`, error);
        throw error;
    }
};

export interface FollowUpPayload {
    followup_type: 'note' | 'call' | 'email' | 'task' | string;
    notes: string;
    next_followup_date?: string; // ISO string e.g., "2026-03-01T10:00:00Z"
}

export const addLeadFollowup = async (id: string | number, payload: FollowUpPayload): Promise<any> => {
    try {
        const { data } = await API.post(`addleadfollowup/${id}/`, payload);
        return data;
    } catch (error) {
        console.error(`Failed to add followup for lead ID ${id}`, error);
        throw error;
    }
};

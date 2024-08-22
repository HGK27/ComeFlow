import axios from "axios";
import { campaignType } from "./types/campaign";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getCampaigns = async (page: number, limit: number): Promise<campaignType[]> => {
    const response = await axios.get<campaignType[]>(BASE_URL + "/photos", {
        params: {
            _page: page,
            _limit: limit,
        }
    });
    return response.data;
};

export const getCampaigId = async (id: number): Promise<campaignType> => {
    const response = await axios.get<campaignType>(`${BASE_URL}/photos/${id}`);
    return response.data;
};

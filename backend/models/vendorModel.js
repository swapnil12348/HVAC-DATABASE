// backend/models/vendorModel.js
import pool from '../config/db.js';

export const getAllVendors = async () => {
    const query = 'SELECT * FROM vendors ORDER BY vendor_id ASC';
    const result = await pool.query(query);
    return result.rows;
};

// Add this under your existing getAllVendors function:

export const addVendor = async (vendorData) => {
    // 1. Extract the new fields
    const { 
        company_name, contact_person, material_specialty, 
        phone, email, designation, visiting_card_url 
    } = vendorData;

    // 2. Add them to the SQL query (Notice we now have 7 values)
    const query = `
        INSERT INTO vendors (
            company_name, contact_person, material_specialty, 
            phone, email, designation, visiting_card_url
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *; 
    `;
    
    const result = await pool.query(query, [
        company_name, contact_person, material_specialty, 
        phone, email, designation, visiting_card_url
    ]);
    return result.rows[0];
};
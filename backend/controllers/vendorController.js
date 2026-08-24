// backend/controllers/vendorController.js
import * as VendorModel from '../models/vendorModel.js';

export const getVendors = async (req, res) => {
    try {
        const vendors = await VendorModel.getAllVendors();
        res.status(200).json({
            success: true,
            data: vendors
        });
    } catch (error) {
        console.error('Error in getVendors controller:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Add this under your existing getVendors function:

export const createVendor = async (req, res) => {
    try {
        const newVendor = req.body; // The data sent from the React form
        const addedVendor = await VendorModel.addVendor(newVendor);
        
        res.status(201).json({
            success: true,
            data: addedVendor
        });
    } catch (error) {
        console.error('Error in createVendor:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
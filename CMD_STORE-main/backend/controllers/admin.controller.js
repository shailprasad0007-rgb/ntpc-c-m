import multer from 'multer';
import XLSX from 'xlsx';
import PurchaseOrder from '../models/PurchaseOrder.model.js';

const upload = multer({ dest: 'uploads/' });

// Upload Excel file
export const uploadExcel = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // KEY FIX: Add { cellDates: true } here to convert Excel dates to JS Dates
      const workbook = XLSX.readFile(req.file.path, { cellDates: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // range: 3 tells xlsx to skip the first 3 rows
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', range: 3 });

      if (rows.length === 0) {
        return res.status(400).json({ error: 'No data rows found in file' });
      }

      const mapped = rows.map(row => ({
        creator_name: row['Creator Name'],
        // Because of cellDates: true, row['Date'] is now already a Date object
        date: row['Date'] ? new Date(row['Date']) : null, 
        po_no: row['PO NO']?.toString(), 
        creator_employee_no: row['Creator Employee No']?.toString(),
        name_of_work: row['NAME OF THE WORK'],
        agency: row['AGENCY'],
        value_inr: parseFloat(row['Value (INR)']) || 0,
        enq_type: row['Enq Type'],
        ord_plant: row['Ord. Plant'],
        rfx_type: row['RFQ Type'],
        // Same applies to delivery_date
        delivery_date: row['Delivery Date'] ? new Date(row['Delivery Date']) : null, 
        doc_type: row['Doc. Type'],
        vendor_code: row['Vendor Code'],
        city: row['City'],
        region: row['Region'],
        amount_rs_l: parseFloat(row['Amount(Rs - L)']) || 0,
        currency: row['Currency'],
        delv_amount_rs_l: parseFloat(row['Delv. Amount(Rs. L)']) || 0,
        invoiced_amt_rs_l: parseFloat(row['Invoiced Amt.(Rs. L)']) || 0,
        treds_partner: row['TREDS Partner'],
        ssc_ind: row['SSC Ind.'],
        ssc_name: row['SSC Name'],
        capex_opex: row['Capex/Opex'],
        freight_clause: row['Freight Clause'],
        meg_ceg_indicator: row['MEG/CEG Indicator'],
        meg_ceg_enlistment_grp: row['MEG/CEG Enlistment Grp'],
        risk_cost_indicator: row['Risk & Cost Indicator'],
        risk_cost_po: row['Risk & Cost PO'],
        bidder_class: row['Bidder Class'],
        // Same applies to bid_opening_dt
        bid_opening_dt: row['Bid Opening Dt.'] ? new Date(row['Bid Opening Dt.']) : null, 
        bg_applicability: row['BG Applicability'],
        invoicing_party: row['Invoicing Party'],
        ecm_approval_no: row['ECM Approval No.'],
        email: row['Email'],
        dist_code: row['Dist. Code'],
        mobile_no: row['Mobile No.'],
        department_code: row['Department Code'],
        dept_desc: row['Dept Desc.'],
        purchasing_group: row['Purchasing Group'],
        eproc_tag: row['eProc Tag'],
        indent_type: row['Indent Type'],
        reason_text: row['Reason Text'],
        vendor_type: row['Vendor Type'],
        pr_po_days: parseInt(row['PR-PO days'], 10) || 0,
        sme_amt_inr: parseFloat(row['SME Amt(INR)']) || 0,
        addlenqinf: row['AddlEnqInf'],
        released_by: row['Released By'],
      }));

      await PurchaseOrder.truncateAndInsert(mapped);
      res.status(201).json({ message: `Uploaded ${mapped.length} rows successfully` });
    } catch (error) {
      console.error("Excel Upload Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
];

// Update a purchase order
export const updatePO = async (req, res) => {
  const { id } = req.params;
  console.log("PUT Request received for ID:", id); // <--- ADD THIS
  
  // Ensure ID is an integer (fixes some Postgres/MySQL type mismatches)
  const numericId = Number(id);
  
  const updated = await PurchaseOrder.update(numericId, req.body);
  if (!updated) {
    console.log("No record found for ID:", numericId); // <--- ADD THIS
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json(updated);
};

// Delete a purchase order
export const deletePO = async (req, res) => {
  const { id } = req.params;
  const deleted = await PurchaseOrder.delete(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json({ message: 'Deleted successfully' });
};
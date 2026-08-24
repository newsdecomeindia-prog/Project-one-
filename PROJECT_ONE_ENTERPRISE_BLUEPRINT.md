# PROJECT ONE — A-to-Z MASTER ENTERPRISE BLUEPRINT & TECHNICAL SPECIFICATION

---

## 1. Executive Summary

PROJECT ONE is an Enterprise Manufacturing Factory Operating System designed specifically for Indian manufacturing environments. It bridges the critical disconnect between shop floor operations, supply chain logistics, quality control, maintenance, back-office accounting, HR, and senior leadership.

Unlike legacy ERP solutions (such as SAP S/4HANA, Oracle ERP, or Microsoft Dynamics) that often require excessive manual data entry, complex multi-screen navigation, and rigid administrative overhead, PROJECT ONE is engineered around one foundational principle:

> **«Reduce employee pain, reduce manual work, reduce repeated data entry, reduce follow-up, reduce mistakes, save time, improve visibility and help the factory run better.»**

[LOCKED REQUIREMENT]: PROJECT ONE connects 13 core modules across the entire business lifecycle. It strictly enforces a single-entry data propagation model: **One-Time Data Entry → Reuse Everywhere → Automatic Validation → Automatic Workflow → Human Approval Only Where Required → Complete Audit Trail → Complete History.**

---

## 2. Vision

To establish an integrated, real-time, zero-redundancy Factory Operating System that operates as the single source of truth for Indian manufacturing enterprises. PROJECT ONE transforms traditional transactional recording into an event-driven, proactive operational engine where:
- Every physical material movement, shop-floor event, and administrative action triggers automated downstream workflows.
- Paperwork, redundant Excel reporting, manual follow-ups via phone/WhatsApp, and untracked shop-floor delays are eliminated.
- Factory personnel spend less time doing data entry and more time driving quality, throughput, and operational excellence.

`[LOCKED REQUIREMENT]`: The system connects HR, Purchase, Supplier, Store, Quality, Production, Maintenance, Dispatch, Accounts & Finance, Sales, Admin, Management, AI Brain, and Continuous Improvement into a unified architecture.

---

## 3. Objectives

1. **Eliminate Duplicate Data Entry:** 100% of transaction data (PO, GRN, Work Order, Invoice, Attendance) flows automatically into connected downstream modules without re-keying.
2. **Reduce Operational Lead Time:** Cut purchase-to-receipt and production-to-dispatch lead times by eliminating manual approval bottlenecks and physical documentation delays.
3. **Ensure 100% Traceability:** Provide bidirectional batch and serial traceability from raw material supplier heat numbers through shop floor consumption, WIP assembly, final inspection, dispatch, and customer delivery.
4. **Proactive Exception Management:** Shift management focus from passive reporting to active exception handling via automatic system alerts (e.g., GRN QA pending > 4 hours, machine breakdown > 30 mins, stock below safety levels).
5. **Real-time Financial & Operational MIS:** Live auto-generated dashboards for shop floor operators, department managers, plant heads, and the CEO, removing the need for manual daily Excel compilation.
6. **Mobile-First Shop Floor Empowerment:** Enable 100% of operational approvals, stock transfers, gate logging, quality logs, and status checks via responsive mobile interfaces and QR/barcode scanning.

---

## 4. Product Principles

PROJECT ONE strictly adheres to 26 Golden Product Principles across all modules:

1. **Minimum Manual Data Entry:** Pre-fill all fields from preceding upstream records.
2. **Maximum Automation:** Auto-trigger workflows, ledger postings, and inventory movements upon approved status changes.
3. **One-Time Data Capture:** Capture data once at point-of-origin (e.g., Gate Entry) and reuse across Store, Quality, Accounts, and Analytics.
4. **Reuse Existing Data:** Master data and open transactions dynamically populate selection dropdowns and forms.
5. **No Unnecessary Duplicate Screens:** Single unified views for transaction creation, inspection, and history.
6. **No Unnecessary Approvals:** Rule-based automated approvals for threshold-compliant routine transactions.
7. **Role-Based Access Control (RBAC):** Strict permissions down to field level, plant level, and transaction level.
8. **No Transaction Deletion:** `[LOCKED REQUIREMENT]` Absolute prohibition of physical database `DELETE` statements on business transactions.
9. **Reverse/Cancel Workflow:** Errors are corrected via authorized reversal/cancellation entries with mandatory reason tracking.
10. **Mandatory Reason:** Every cancellation, override, or adjustment requires a structured and free-text reason code.
11. **Complete Audit History:** System logs `Who`, `What`, `When`, `Where`, `Old Value`, `New Value`, `IP/Device` for every edit.
12. **Universal Search:** Instant indexing across all entity types (Part #, PO, GRN, Invoice, Serial, Employee, Machine).
13. **360-Degree Record History:** Full visual timeline visualization for every business entity.
14. **Mobile + Web Native:** Fully responsive UI with feature parity for on-the-go approvals and shop-floor execution.
15. **Email + WhatsApp Integration:** Multi-channel notifications for alerts, PO delivery schedules, dispatches, and invoices.
16. **QR + Barcode Support:** Integrated scanning for bin locations, material batches, gate passes, assets, and invoices.
17. **Real-Time Status Visibility:** Live status badges (e.g., `Gate Entry Open`, `QA Hold`, `WIP In-Progress`, `Gate Out Complete`).
18. **Exception-Based Alerts:** Push notifications triggered when SLAs or quality thresholds are violated.
19. **Data-Driven AI:** AI features must operate strictly on verified historical and real-time database inputs.
20. **No Claim of Unsubstantiated AI Certainty:** AI insights output confidence levels, data sources, and underlying rules.
21. **Identify Incomplete/Pending Processes:** System highlights orphan records, unassigned gate entries, and pending QA lots.
22. **Clear Start & End for Every Process:** Every workflow has explicit lifecycle states from initialization to final closure.
23. **No Unexplained Transactions:** Every inventory change or financial ledger posting must link to an underlying document.
24. **Actively Reduce Employee Workload:** Auto-calculate taxes, HSN, land costs, payment due dates, and line balancing.
25. **Mandatory Manual Fallback:** `[ARCHITECT RECOMMENDATION]` Fallback procedures defined for internet outages or hardware scanner failures.
26. **Uncompromised Security:** AES-256 encryption at rest, TLS 1.3 in transit, MFA for privileged roles, and strict multi-tenant isolation.

---

## 5. Complete Architecture

PROJECT ONE utilizes a Cloud-Native, Event-Driven Microservices-capable Modular Monolith architecture designed for high throughput, local offline resilience, and seamless vertical/horizontal scalability across multiple plants and business units.

```
+-----------------------------------------------------------------------------------+
|                                  USER INTERFACE                                   |
|   Web Application (React / Next.js)   |   Mobile Native App (React Native / PWA)  |
+-----------------------------------------------------------------------------------+
                                         | REST / WebSockets / gRPC
+-----------------------------------------------------------------------------------+
|                                  API GATEWAY                                      |
|    Authentication (JWT/OAuth2) | Rate Limiting | RBAC Enforcement | Logger      |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                               CORE SERVICES LAYER                                 |
|  +--------------+  +--------------+  +--------------+  +-----------------------+  |
|  |  HR Service  |  | Purchase Service| Store/Inventory| Quality Service       |  |
|  +--------------+  +--------------+  +--------------+  +-----------------------+  |
|  | Production Svc|  | Maintenance Svc| Dispatch Svc |  | Accounts/Finance Svc  |  |
|  +--------------+  +--------------+  +--------------+  +-----------------------+  |
|  | Sales Service|  | Admin Service|  | Management Svc| Continuous Improve Svc|  |
|  +--------------+  +--------------+  +--------------+  +-----------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                        CROSS-CUTTING ENGINES & BRAIN                              |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  |  Approval Engine   |  | Automation Engine  |  |  Notification Engine        |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | Universal Search   |  | Audit & 360 Engine |  | AI Brain & Decision Engine  |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                                 DATA & PERSISTENCE                                |
|  PostgreSQL (Primary Relational DB) | Redis (Cache & Session) | Elasticsearch (Search) |
|  S3 Compatible Storage (Document Attachments) | TimescaleDB (IoT & Sensor Telemetry) |
+-----------------------------------------------------------------------------------+
```

---

## 6. 13 Core Modules

`[LOCKED REQUIREMENT]`: Phase 1 explicitly locks the following 13 core modules:

1. **HR Module:** Manpower requisition, candidate pipeline, employee lifecycle, attendance, shift management, OT, payroll, training skill matrix, goal tracking, and exit clearance.
2. **Purchase Module:** Purchase Requisition (PR), RFQ management, vendor quotation comparison, vendor selection & onboard workflows, Purchase Orders (PO), approval matrix, and Supplier Portal access.
3. **Store & GRN Module:** Gate entry recording, material unloading logs, GRN generation against PO/DO, partial shipment management, line-item verification, QA Hold routing, and multi-bin storage.
4. **Quality Module:** Incoming material QA, Sampling plans (AQL), In-Process QA, First-Piece inspection, Final Inspection, Defect disposition, Rejection tracking, and 8D CAPA workflows.
5. **Production Module:** Demand planning, Work Order creation, multi-level BOM management, automatic component backflushing, raw material conversion yield, cycle-time tracking, line balancing, rework logs, and Scrap tracking.
6. **Maintenance Module:** Machine passport, Preventive Maintenance (PM) calendars, breakdown logs, MTTR/MTBF analysis, spare parts inventory, AMC tracking, and AI maintenance advisory.
7. **Dispatch Module:** Sales Order dispatch allocation, picking lists, batch allocation, loading verification, automatic Invoice generation, E-Way Bill generation data staging, ASN generation, LR transport capture, QR Gate-Out scanning, and Proof of Delivery (POD).
8. **Accounts & Finance Module:** Accounts Payable (AP) 3-way matching automation, Accounts Receivable (AR), customer collections, Fixed Assets, Cost Center accounting, Budget vs Actual tracking, GST filing data staging, and automated financial statements.
9. **Sales Module:** Lead/Enquiry capture, Customer Quotations, Sales Orders (SO), customer credit control, delivery scheduling, and live order tracking pipeline.
10. **Admin Module:** Visitor management, gate passes (returnable/non-returnable), security checks, employee ID issuance, asset assignment, and facility management.
11. **Management Module:** Executive CEO dashboard, Plant Head operational cockpit, live KPI trackers, automated MIS report generation, and AI-powered operational summaries.
12. **AI Brain Module:** Data-driven operational assistant, anomaly detection alerts, inventory reorder forecasting, maintenance risk prediction, and natural language query processing.
13. **Continuous Improvement Module:** Kaizen suggestion workflow, TPM activity logs, 5S audit scoring, CAPA progress tracking, cost-saving idea tracking, and ROI verification.

---

## 7. Master Data Architecture

Master data is defined and standardized prior to executing transactions. All master entities support plant-level multi-tenancy and audit trails.

### Company & Organizational Master
- **Company Master:** Legal entity name, GSTIN, PAN, CIN, Registered Address, Logo, Base Currency (`INR`).
- **Plant Master:** Plant Code (e.g., `PLANT-01`), Name, Address, State, GSTIN, Factory Manager.
- **Department Master:** Code (e.g., `DEP-PROD`), Name, Cost Center Code, Department Head ID.
- **Division / Business Unit Master:** BU Code, Operating Segment.
- **Cost Center / Profit Center Master:** Cost Center Code, Budget Allocation, GL Group.

### User & Permission Master
- **User Master:** User ID, Employee ID, User Name, Password Hash (Argon2), Mobile Number, Email, Assigned Plant IDs, Assigned Role IDs, Approval Level, Approval Limit (INR), Status (`Active`/`Suspended`).

### Material Master
- **Part Number / Item Code:** Unique primary identifier (e.g., `RM-STEEL-001`, `FG-GEAR-100`).
- **Attributes:** Part Name, Material Category (`RM`, `WIP`, `FG`, `Scrap`, `Reject`, `Consumable`, `Spare`), Primary UOM (e.g., `KG`, `PCS`, `MTR`), Alternate UOM, Conversion Factor, HSN Code, GST Rate (%), Unit Net/Gross Weight, Standard Dimensions.
- **Tracking Flags:** Batch Tracking Required (`Yes`/`No`), Serial Tracking Required (`Yes`/`No`), Shelf Life (Days), Special Storage Conditions.
- **Inventory Thresholds:** Reorder Level (ROL), Minimum Safety Stock, Maximum Stock Limit, Standard Ordering Quantity (EOQ).

### Supplier Master
- **Supplier Code:** Unique Code (e.g., `SUP-00123`), Legal Name, Trade Name, GSTIN, PAN, MSME Category (`Micro`, `Small`, `Medium`, `N/A`), Registered Address, Contact Person, Phone, Email, Bank Account Number, IFSC Code, Payment Terms (e.g., `30 Days Net`), Credit Limit, Quality Rating, On-Time Delivery Index, Onboarding Status (`Pending`, `Approved`, `Blacklisted`).

### Customer Master
- **Customer Code:** Unique Code (e.g., `CUST-0045`), Company Name, GSTIN, Billing Address, Shipping Addresses (Multi-location support), Contact Person, Email, Mobile, Credit Limit (INR), Payment Terms, Assigned Salesperson.

### Machine Master
- **Machine ID:** Unique Code (e.g., `CNC-01`), Machine Name, Plant, Line, Model/Make, Year of Manufacture, Commission Date, Standard Capacity (Units/Hr), Rated Cycle Time (Seconds), Installed kW Power, Preventive Maintenance Schedule (Hours/Days), Connected IoT Device ID (if present), Critical Spares List.

### Location Master (Configurable Coding)
- `SLRM` = Raw Material Store
- `SLWS` = Work-in-Progress Store / Sub-Assembly
- `SLWP` = Production Floor WIP Bin
- `SLFG` = Finished Goods Store
- `SLRJ` = QA Rejection Store
- `SLSC` = Scrap Yard Store
- `SLHD` = Quality Hold Location
`[LOCKED REQUIREMENT]`: Exact location codes are fully configurable per company/plant.

---

## 8. End-to-End Factory Process

The complete unified operational lifecycle follows this uninterrupted data flow:

```
[SALES / DEMAND]
       │
       ▼
[Sales Order (SO)] ──► [Production Planning (MPS)] ──► [Material Requirement (MRP)]
                                                               │
                                                               ▼
[Vendor Selection & PO] ◄── [Quotation / RFQ] ◄── [Purchase Requisition (PR)]
       │
       ▼
[Supplier Dispatch / ASN] ──► [Gate Entry Logging] ──► [Goods Receipt Note (GRN)]
                                                               │
                                                               ▼
[Inventory Location] ◄── [Accepted Stock] ◄── [QA Inspection (Hold/Pass/Reject)]
       │
       ▼
[Material Issue Note] ──► [Production WIP] ──► [Finished Goods (FG) Yield]
                                                       │
                                                       ▼
[Dispatch Planning] ◄── [FG Quality Release] ◄── [Final Quality Inspection]
       │
       ▼
[Picking & Loading] ──► [Tax Invoice & ASN] ──► [E-Way Bill Staging & QR Gate Out]
                                                               │
                                                               ▼
[Customer Delivery & POD] ──► [Accounts Receivable] ──► [Cash Collection]
```

**Parallel Operational Flows:**
- **HR Lifecycle:** Manpower Plan → Recruitment → Candidate Onboarding → Shift/Attendance → Overtime Calculation → Statutory Payroll → Training Skill Matrix → Performance Review → Exit Clearance.
- **Maintenance Lifecycle:** Machine Asset Registration → Running Hours Log → PM Task Trigger → Breakdown Work Order → Spare Issue → Machine Repair → MTBF/MTTR Update → AI Advisory.
- **Quality Lifecycle:** Incoming Material Inspection → Process Quality Audit → Final FG QA → Rejection Logging → 8D CAPA Log → Preventive Action Verification.
- **Continuous Improvement Lifecycle:** Employee Kaizen Submission → Evaluation Committee Review → ROI Calculation → Execution Approval → Implementation → Cost Saving Validation → Company Recognition.

---

## 9. Detailed Module Workflows

### 9.1 HR Module
- **Input:** Department Manpower Requisition, Employee Onboarding Form, Biometric Punch Feed, Leave Application, Overtime Request.
- **Validation:** Check headcount against approved budget; check biometric punch intervals against shift timings; check leave balance prior to approval.
- **Decision:** Auto-approve attendance if punches match shift rules within grace period (e.g., 10 mins); route overtime to manager if requested OT exceeds 2 hours/day.
- **Automation:** Auto-compute monthly payroll, PF, ESI, LWF, PT, TDS deductions based on validated attendance logs and OT rules; generate digital payslips on 1st of every month.
- **Human Approval:** Department Head approves leave and overtime; HR Manager executes final payroll release.
- **Output:** Approved Attendance Ledger, Statutory Payroll Sheet, Electronic Payslips, Updated Employee Skill Matrix.
- **Notification:** App push & WhatsApp to employee for leave approval and payslip availability.
- **Audit:** Complete logging of salary structure modifications, attendance manual overrides, and exit clearance signoffs.
- **Exception:** Biometric hardware failure triggers manual supervisor sign-off with geo-tagged/photo-verified attendance punch.

### 9.2 Purchase Module
- **Input:** Reorder level auto-trigger or manual Purchase Requisition (PR), Supplier RFQ responses.
- **Validation:** Validate PR item against Material Master; check requested quantity against budget caps; verify vendor GSTIN status via API verification.
- **Decision:** If PR total value <= ₹50,000, route for single-tier manager sign-off; if > ₹50,000, trigger RFQ minimum 3-vendor comparison matrix.
- **Automation:** Auto-populate Landed Cost comparison table (Basic Rate + Freight + GST - Input Tax Credit); auto-generate PO draft from selected winning quotation.
- **Human Approval:** Purchase Head & Finance Head approve PO based on delegated financial authorization tiers.
- **Output:** Released Purchase Order (PO) PDF with embedded QR code.
- **Notification:** Automatic email and WhatsApp notification to supplier with PO attachment and delivery schedule link.
- **Audit:** Track original PR request, quoted rates from all vendors, approval timestamps, and PO release logs.
- **Exception:** Vendor rate exceeds historical standard cost by > 5% triggers mandatory variance reason entry and Finance approval.

### 9.3 Store & GRN Module
- **Input:** Physical truck arrival at gate, supplier invoice, packing list, PO reference.
- **Validation:** Verify PO exists, PO status is `Released`, PO line item matches material code, quantity delivered <= open PO line balance.
- **Decision:** If invoice number was already processed for this vendor, block duplicate entry instantly. If over-delivery exceeds 0% allowance (or configured tolerance), block entry unless authorized.
- **Automation:** Gate Entry creates `Gate Entry ID` and notifies Store Team; Store creates GRN selecting items from open PO; system splits stock into `QA Hold` location (`SLHD`).
- **Human Approval:** Storekeeper verifies physical package count and signs off GRN receipt.
- **Output:** Printed Goods Receipt Note (GRN), Material Unloading Tag with QR Code, Stock Movement to `SLHD`.
- **Notification:** Instant app notification to Quality Inspector that material is staged for incoming inspection.
- **Audit:** Record Gate Entry timestamp, GRN creation time, storekeeper ID, original PO balance, and new pending PO quantity.
- **Exception:** Damaged packaging at gate triggers Gate Entry photo attachment and partial receipt entry with Supplier deviation notice.

### 9.4 Quality Module
- **Input:** Auto-generated Inspection Lot from GRN creation, In-Process check sheet, Final Inspection request.
- **Validation:** Verify sample quantity against AQL standard table (e.g., IS 2500 / ISO 2859); check measured parameters against drawing specifications.
- **Decision:** If all parameters comply, set lot status to `Accepted`; if non-conforming, allow user to flag as `Rework`, `Rejected`, or `Concession/Deviation`.
- **Automation:** `Accepted` status automatically transfers stock from `SLHD` to usable Store (`SLRM`); `Rejected` transfers stock to Reject Location (`SLRJ`); auto-generates Supplier Debit Note request for rejected quantities.
- **Human Approval:** Quality Manager approval required for `Concession` or `Rejection` disposition.
- **Output:** Quality Inspection Certificate (COA), Stock Status Update, Rejection Report, 8D CAPA Action Item.
- **Notification:** Instant alert to Store, Purchase, and Supplier detailing rejection metrics and photo evidence.
- **Audit:** Parameter-by-parameter measured values recorded against inspector User ID and timestamp.
- **Exception:** Out-of-spec measurement halts lot release and auto-creates high-priority CAPA ticket assigned to Quality Engineer.

### 9.5 Production Module
- **Input:** Sales Order or Master Production Schedule (MPS), Work Order (WO) request, BOM.
- **Validation:** Check raw material inventory availability in `SLRM` before issuing WO; check machine capacity schedule.
- **Decision:** Determine production route based on multi-level BOM; trigger backflushing rule (automatic material consumption upon FG yield entry).
- **Automation:** Work Order issuance reserves inventory; FG production logging automatically backflushes BOM component quantities from `SLWP` and calculates yield variance.
- **Human Approval:** Production Supervisor approves daily shop floor shift logs and manual material issue requests.
- **Output:** Production Yield Entry, WIP Movement Log, Component Backflush Ledger, Scrap Generation Log.
- **Notification:** Push alert to Store if WIP bin stock falls below next hour production requirement.
- **Audit:** WO creation, material issue timestamps, shift yield entries, operator ID, machine ID, cycle times, and scrap generation reasons.
- **Exception:** Production scrap rate exceeding BOM standard by > 2% requires mandatory supervisor downtime/scrap reason logging.

### 9.6 Maintenance Module
- **Input:** Machine running hour counters (manual or IoT), PM schedule calendar, breakdown alert ticket logged by operator.
- **Validation:** Verify Machine ID; validate spare part availability in Spare Store prior to scheduling PM task.
- **Decision:** Auto-categorize breakdown severity (`Minor`, `Major`, `Critical Line Stop`).
- **Automation:** Machine breakdown logging auto-pauses production line availability on Production Dashboard; auto-issues spare parts from Maintenance Store upon work order execution.
- **Human Approval:** Maintenance Manager signs off breakdown completion after production line validation.
- **Output:** Preventive Maintenance Task List, Breakdown Repair Ticket, Spare Consumption Log, Updated MTBF/MTTR Metrics.
- **Notification:** Instant SMS/WhatsApp/Push alert to Maintenance Engineers upon `Critical Line Stop` log.
- **Audit:** Time of breakdown log, technician assigned, repair start time, spare parts consumed, repair completion time, and supervisor sign-off.
- **Exception:** Unavailability of critical spare triggers urgent PR creation with high-priority flag.

### 9.7 Dispatch Module
- **Input:** Sales Order (SO) release, Dispatch Plan, Picking List, Customer Shipping Address.
- **Validation:** Ensure items picked match SO line details, batch numbers, and FG Quality release status (`SLFG`). Ensure Customer Credit Limit is not breached.
- **Decision:** If Customer account is on `Credit Hold`, block invoice generation until released by Finance.
- **Automation:** Auto-generate Picking List based on FIFO batch expiry rules; generate GST Tax Invoice, Staging Data for E-Way Bill, Advance Shipping Notice (ASN), and Gate Out QR code.
- **Human Approval:** Dispatch Officer confirms physical loading; Security Guard scans QR code at gate to execute `Gate Out`.
- **Output:** Tax Invoice PDF, Packing List, LR Copy, E-Way Bill JSON/PDF, Scanned QR Gate Pass.
- **Notification:** Auto-send WhatsApp & Email to customer with Invoice, Vehicle No, Driver Contact, LR No, and Tracking Link upon `Gate Out`.
- **Audit:** Capture picker ID, loader ID, gate security scan timestamp, vehicle number, driver phone, and delivery status updates.
- **Exception:** Vehicle weight mismatch at weighbridge blocks Gate Out until re-inspection is logged.

### 9.8 Accounts & Finance Module
- **Input:** Vendor Invoice, GRN reference, Approved PO, Customer Sales Invoice, Employee Expense Claims, Bank Statement Feed.
- **Validation:** 3-Way Match Validation (PO Rate vs Invoice Rate, GRN Qty vs Invoice Qty, Tax HSN Code vs GST Portal Data).
- **Decision:** If 3-Way match is within 0% variance (or configured tolerance), auto-stage invoice for payment approval; if mismatch > 0, block AP logging and flag for AP Exception review.
- **Automation:** Auto-post accounting ledgers (Debit Material Receipt Uninvoiced, Credit Vendor AP); auto-calculate TDS under Sec 194Q/194C; calculate customer payment due dates based on master terms.
- **Human Approval:** Finance Manager approves AP payment batch; CFO approves high-value disbursements.
- **Output:** Vouchers (AP, AR, General Ledger, Payment Voucher), GST R1/3B Staging Reports, Bank Payment File (NEFT/RTGS CSV).
- **Notification:** Payment notification sent via WhatsApp/Email to Vendor upon payment batch execution.
- **Audit:** Unalterable ledger entry timestamp, user ID, original source document linkage, payment batch ID, and bank confirmation reference.
- **Exception:** Mismatch between Vendor GSTIN on invoice vs Supplier Master blocks invoice processing until updated.

### 9.9 Sales Module
- **Input:** Customer Enquiry, Request for Quotation (RFQ), Customer Sales Order (SO) document.
- **Validation:** Check pricing against Master Price List; verify customer credit standing and active status.
- **Decision:** Auto-check finished goods inventory (`SLFG`) availability; if stock exists, reserve for SO; if unavailable, auto-trigger Production Planning requisition.
- **Automation:** Generate Quotation PDF; convert approved Quotation to Sales Order with 1-click; link SO lines to Production Work Orders.
- **Human Approval:** Sales Manager sign-off for non-standard pricing or special payment credit terms.
- **Output:** Formal Quotation, Confirmed Sales Order, Customer Order Acknowledgment PDF.
- **Notification:** Send SO confirmation email/WhatsApp to customer with estimated delivery date.
- **Audit:** Record enquiry date, quotation revisions, discount approvals, SO authorization, and customer amendment logs.
- **Exception:** Order cancellation requires mandatory cancellation reason and updates connected Production Work Orders.

### 9.10 Admin Module
- **Input:** Visitor check-in, Material Gate Pass request (Returnable/Non-Returnable), Company Asset Assignment.
- **Validation:** Verify visitor host availability; verify asset authorization before issuing gate pass.
- **Decision:** Categorize Gate Pass as `Returnable` (with mandatory return due date) or `Non-Returnable`.
- **Automation:** Generate digital Visitor Badge with QR code; generate Material Gate Pass document; send SMS alert to host employee.
- **Human Approval:** Department Head approves returnable/non-returnable material gate pass.
- **Output:** Digital Visitor Pass, Material Gate Pass PDF, Asset Issue Register entry.
- **Notification:** Notification sent to host upon visitor arrival; alert sent to Admin if returnable gate pass exceeds due date.
- **Audit:** Gate entry/exit scan timestamps, security guard ID, photo capture of visitor/driver, and host sign-off.
- **Exception:** Overdue returnable material triggers daily automated escalation alerts to Admin Manager and Security.

### 9.11 Management Module
- **Input:** Real-time transaction streams from all 12 operational modules.
- **Validation:** Aggregation of live data without manual intervention or data staging delays.
- **Decision:** Automated threshold monitoring (e.g., daily sales target vs actual, OEE trends, cash flow forecast).
- **Automation:** Auto-generate daily executive summaries at 08:00 AM and 08:00 PM; trigger AI anomaly highlights.
- **Human Approval:** Executive review and strategic decision input.
- **Output:** CEO Executive Cockpit, Plant Head Operational Dashboard, Daily Automated MIS Reports (PDF/Excel).
- **Notification:** Morning WhatsApp summary report sent to CEO, COO, and Plant Heads.
- **Audit:** Dashboard view logs, exported report history, and executive override logs.
- **Exception:** Critical plant metric drop (e.g., OEE < 65% or Rejection > 3%) auto-highlights in Red on CEO cockpit with drill-down breakdown.

### 9.12 AI Brain Module
- **Input:** Historical database records (360° history, maintenance logs, yield rates, delivery histories, inventory movements).
- **Validation:** Check data completeness score before running predictive algorithms; enforce data confidence thresholds.
- **Decision:** Evaluate patterns using deterministic rules, regression models, and statistical process control (SPC).
- **Automation:** Auto-identify reorder points, flag potential vendor delivery delays based on historical lead times, identify top breakdown root causes.
- **Human Approval:** AI acts purely as Decision Support; human operator must confirm any automated AI action (e.g., releasing an auto-generated PO).
- **Output:** Natural language query answers, automated exception alerts, predictive maintenance recommendations, cost-saving proposals.
- **Notification:** In-app and WhatsApp AI smart alerts sent to concerned department leads.
- **Audit:** Record query text, AI generated recommendation, underlying data sources used, confidence rating (%), and human action taken.
- **Exception:** Insufficient data triggers explicit user notification: *"Insufficient historical data to generate forecast (minimum 30 data points required)."*

### 9.13 Continuous Improvement Module
- **Input:** Employee Kaizen submission, 5S audit scores, TPM activity reports, CAPA action plans.
- **Validation:** Ensure Kaizen submission contains problem statement, proposed solution, and estimated cost/time saving.
- **Decision:** Evaluation committee reviews idea feasibility and categorizes savings (`Direct Cost`, `Time`, `Safety`, `Quality`).
- **Automation:** Auto-assign tracking ID; link approved Kaizen to relevant Cost Center and Machine Master; track implementation progress.
- **Human Approval:** Continuous Improvement (CI) Lead & Plant Head sign-off for reward/recognition release.
- **Output:** Kaizen Action Ticket, 5S Audit Scorecard, Monthly Factory Cost Saving Summary Report.
- **Notification:** Monthly recognition broadcast to factory employees via WhatsApp/App feed.
- **Audit:** Idea creation timestamp, evaluator reviews, implementation completion timestamp, verified cost saving calculations.
- **Exception:** Delayed Kaizen implementation past due date triggers automatic reminder to assigned action owner.

---

## 10. Roles & Permissions

PROJECT ONE enforces a granular Role-Based Access Control (RBAC) matrix across Company, Plant, Department, Document, and Field levels.

```
+---------------------+---------+----------+-------+---------+--------+---------+--------+
| Role / Module       | Admin   | Plant Hd | Store | Quality | Prod   | Finance | Exec   |
+---------------------+---------+----------+-------+---------+--------+---------+--------+
| Master Data         | C/R/U/D*| R/U      | R     | R       | R      | R       | R      |
| Purchase Requisition| C/R/U   | C/R/U/A  | C/R   | C/R     | C/R    | R       | R      |
| Purchase Order      | C/R/U   | R/A      | R     | R       | R      | R/A     | R      |
| Gate Entry & GRN    | C/R/U   | R        | C/R/U | R       | R      | R       | R      |
| Quality Inspection  | C/R/U   | R        | R     | C/R/U/A | R      | R       | R      |
| Work Order & Yield  | C/R/U   | R        | R     | R       | C/R/U/A| R       | R      |
| Dispatch & Invoice  | C/R/U   | R        | C/R   | R       | R      | C/R/U/A | R      |
| Financial Ledger    | C/R/U   | R        | R     | R       | R      | C/R/U/A | R      |
| System Reversal     | R       | A        | Denied| Denied  | Denied | A       | R      |
| Universal Audit Log | R       | R        | Denied| Denied  | Denied | R       | R      |
+---------------------+---------+----------+-------+---------+--------+---------+--------+
* Note: 'D' refers exclusively to master archiving (active/inactive flag), NOT transaction deletion.
Key: C = Create, R = Read, U = Update, A = Approve.
```

---

## 11. Approval Engine

The Approval Engine is fully configurable and decoupled from hardcoded business logic.

```
[Transaction Initiated]
          │
          ▼
[Evaluate Approval Rules Matrix] ──► (Rule: Value, Plant, Dept, Category)
          │
          ├────────────────────────────────────────┐
          ▼                                        ▼
[Condition Met: Routine / Under Limit]   [Condition Met: Requires Escalation]
          │                                        │
          ▼                                        ▼
[Auto-Approve & Progress Workflow]       [Route to Tier 1 Approver]
                                                   │
                                                   ├───────────────┐
                                                   ▼               ▼
                                              [Approved]      [Rejected]
                                                   │               │
                                                   ▼               ▼
                                         [Check Tier 2...]  [Return to Initiator]
```

- **Dynamic Matrix Parameters:** Transaction Type (`PO`, `PR`, `Invoice Reversal`, `OT`, `Gate Pass`), Value Thresholds (INR), Cost Center, Material Type.
- **Delegation of Authority:** Approvers can set temporary delegation during leave periods with full audit logging.
- **SLA Escalation:** If an approver does not act within configured SLA (e.g., 4 hours for Gate Entry GRN, 24 hours for PO), the approval request automatically escalates to the next hierarchical authority with urgent push notifications.

---

## 12. Automation Engine

The Automation Engine evaluates every transactional event using the standardized **I-V-D-A-H-O-N-A-E** framework:

1. **Input (I):** Data packet initiating the event (e.g., Barcode scan at Unloading Bay).
2. **Validation (V):** System performs automated integrity checks (PO status, line quantity, duplicate check).
3. **Decision (D):** Automated rule evaluation (e.g., Is quality inspection mandatory for this material?).
4. **Automation (A):** System updates inventory state (`SLHD`), stages QA inspection lot, posts accounting pre-ledger.
5. **Human Approval (H):** Required only if exception or authorization limit is triggered.
6. **Output (O):** Generated document/entity (e.g., GRN Receipt Number `#GRN-2025-0891`).
7. **Notification (N):** Trigger targeted messages to Storekeeper, Supplier, and QA Inspector.
8. **Audit (A):** Log event immutable details in Audit Trail database.
9. **Exception (E):** Handler for edge cases (e.g., Over-shipment triggers immediate deviation workflow).

---

## 13. Notification Engine

To prevent notification fatigue and ensure actionable communication, PROJECT ONE enforces smart context-aware routing:

- **Channels:** In-App Push, Web Desktop Banner, Email (with PDF attachments), WhatsApp Business API, SMS (for critical security/OTP alerts).
- **Notification Rules Matrix:**
  - `Gate Entry Created` → In-App Push to Storekeeper & QA.
  - `PO Released` → Email & WhatsApp to Supplier with PDF download button.
  - `Critical Machine Breakdown` → In-App & SMS to Maintenance Lead & Plant Head.
  - `Dispatch Gate Out` → WhatsApp to Customer with tracking link & Invoice.
  - `Approval Pending > SLA` → Escalation Push to Next Level Approver.
- **Configurability:** Every user can manage channel preferences while administrators enforce mandatory operational alerts.

---

## 14. Universal Search

PROJECT ONE features a high-performance Universal Search Engine powered by Elasticsearch/PostgreSQL Full-Text Search indexing.

```
[ Universal Search Bar: "GRN-2025-0891" or "STEEL COIL" or "MH-12-AB-1234" ]
                                      │
                                      ▼
+-----------------------------------------------------------------------------------+
| SEARCH RESULTS & CONNECTED ENTITY TREE                                            |
+-----------------------------------------------------------------------------------+
| Purchase Order: PO-2025-0412 (Vendor: Tata Steel Ltd)                             |
|  └─► Gate Entry: GE-2025-0988 (Vehicle: MH-12-AB-1234 | Date: 12-May-2025)         |
|      └─► Goods Receipt: GRN-2025-0891 (Qty: 10,000 KG | Store: SLHD)                |
|          └─► QA Lot: QA-2025-0450 (Status: PASSED | Inspector: R. Sharma)          |
|              └─► Stock Movement: Transferred to SLRM-BIN-A04                     |
|                  └─► Production Issue: WO-2025-0112 (Assembly Part # FG-8841)    |
|                      └─► Sales Invoice: INV-2025-1044 (Customer: Bajaj Auto)     |
+-----------------------------------------------------------------------------------+
```

- **Supported Search Queries:** Part #, Part Name, Employee ID/Name, Sales Order #, PO #, GRN #, Invoice #, Vehicle #, Supplier Name, Customer Name, Machine Code, Batch #, Serial #, Barcode/QR string, Date ranges.
- **Deep-Linking:** Clicking any node in the search result instantly opens the 360-degree interactive record view.

---

## 15. 360-Degree History

Every major transactional entity (PO, Customer Order, Work Order, Machine, Employee, Batch) maintains an interactive visual timeline.

```
[ PO Created ] ──► [ Approved ] ──► [ Supplier Dispatched ] ──► [ Gate Entry ]
  10:00 AM           10:30 AM          02:15 PM                  08:30 AM (Next Day)
  User: A. Verma     User: K. Patel    System Auto               Security Guard
       │
       ▼
[ GRN Received ] ──► [ QA Passed ] ──► [ Stock Issued ] ──► [ Invoice & Paid ]
  09:15 AM            11:00 AM          02:00 PM             04:30 PM
  Storekeeper         QA Inspector      Prod Operator        Finance AP
```

`[LOCKED REQUIREMENT]`: Every timeline point captures:
- **Who:** User ID, Name, Role.
- **What:** Action performed (Created, Modified, Approved, Staged, Released).
- **When:** Microsecond-accurate timestamp.
- **Where:** Plant ID, Location ID, IP Address, Device Type (Mobile/Web).
- **Delta:** Previous Value vs New Value.
- **Context:** Mandatory reason code or transaction commentary.

---

## 16. Audit Trail

PROJECT ONE mandates a continuous, non-bypassable, append-only Audit Trail system.

- **Immutability:** Audit trail tables reside in restricted database tables with no `UPDATE` or `DELETE` permissions granted to any application user or database role.
- **Audit Fields Captured:**
  - `Audit_ID` (BigInt, Primary Key)
  - `Transaction_Type` (e.g., `PURCHASE_ORDER`)
  - `Transaction_ID` (e.g., `PO-2025-0412`)
  - `Action_Type` (`CREATE`, `UPDATE`, `APPROVE`, `REVERSE`, `CANCEL`)
  - `Field_Name` (e.g., `Unit_Price`)
  - `Old_Value` (e.g., `120.00`)
  - `New_Value` (e.g., `115.00`)
  - `Reason_Code` & `User_Comments`
  - `User_ID` & `Role_ID`
  - `Timestamp_UTC` & `Client_IP` / `Device_Fingerprint`
- **Audit Reporting:** Dedicated Security & Audit Dashboard allows authorized auditors to track all overrides, reversals, price edits, and permission changes.

---

## 17. Security

PROJECT ONE enforces defense-in-depth enterprise security controls:

- **Authentication:** Multi-Factor Authentication (MFA) via Time-based One-Time Password (TOTP) or SMS/WhatsApp OTP for privileged roles (Finance, Admin, System Reversals). Argon2id hashing for password storage.
- **Authorization:** Fine-grained Attribute-Based Access Control (ABAC) combined with RBAC. Users are restricted by Plant, Department, Cost Center, and Approval Tier.
- **Data Protection:** Encryption at Rest using AES-256 for all databases and object storage buckets. Encryption in Transit using TLS 1.3 across all client-server and inter-service communications.
- **API Security:** OAuth2 / JWT stateless bearer tokens with short expiry (15 mins) and automatic refresh token rotation. Rate limiting per IP/User (100 req/min).
- **Session Security:** Automatic session timeout after 15 minutes of inactivity on web/mobile apps. Concurrent login detection and prevention.
- **Backup & Disaster Recovery:** Continuous Write-Ahead Logging (WAL) with point-in-time recovery (PITR). Automated daily cross-region encrypted snapshot backups. Target RPO < 5 minutes, Target RTO < 1 hour.

---

## 18. Mobile Architecture

Mobile is a first-class operational tier designed for rugged shop-floor and field execution.

- **Technology Stack:** React Native / Progressive Web App (PWA) with offline-first local SQLite sync.
- **Core Mobile Capability:**
  - **Offline Storage & Sync:** Storekeepers and Maintenance technicians can log scans and readings in offline network dead-zones. Auto-sync triggers upon network re-connection.
  - **Integrated Camera Scanning:** High-speed QR/Barcode decoding using device camera for instant bin lookup, material receiving, asset verification, and gate pass validation.
  - **Role-Specific Mobile Screens:**
    - *Security Guard View:* Gate In / Gate Out scanning, visitor photo capture.
    - *Storekeeper View:* Material unloading, GRN verification, stock movement.
    - *QA Inspector View:* Parameter input, photo attachment of defective parts.
    - *Maintenance Tech View:* Breakdown ticket list, spare scanning, PM checklist.
    - *Executive View:* 1-click approvals, high-level KPIs, AI alerts.

---

## 19. Web Architecture

The Web UI is optimized for fast, multi-window desktop administrative productivity:

- **Technology Stack:** React / Next.js, Tailwind CSS, TypeScript, TanStack Query/Table.
- **UI/UX Design Standards:**
  - **Single-Page Productivity:** Keyboard-first navigation (e.g., `Alt+S` to Save, `Ctrl+K` for Universal Search, `Tab` field cycling).
  - **Density Control:** Standard, Compact, and High-Density table views for power users in Accounts and Purchase.
  - **Auto-Fill & Auto-Suggest:** Contextual smart auto-complete on all dropdowns drawing from master entities and open records.
  - **Instant State Feedback:** Optimistic UI updates with real-time skeleton loaders, progress toasts, and error boundaries.
  - **Multi-Tab Workspace:** Internal tab navigation allowing users to work on multiple POs or Work Orders simultaneously without losing input state.

---

## 20. AI Architecture

The AI Brain operates as a practical, data-grounded decision support engine integrated into daily operations.

```
[ Raw System Data Streams ] (Transactions, IoT Telemetry, Audit Logs)
             │
             ▼
[ Data Hygiene & Validation Pipeline ] ──► (Confidence Check > 90%)
             │
             ▼
[ AI Decision Engine / Statistical Models ]
   ├── Demand Forecasting (Holt-Winters / ARIMA)
   ├── Maintenance Anomaly Detection (Isolation Forest)
   ├── Supplier Reliability Scoring (Weighted Matrix)
   └── Natural Language Query Parser (LLM / RAG Pipeline)
             │
             ▼
[ Actionable Recommendations ] ──► (Explicit Data Source + Confidence Rating %)
             │
             ▼
[ Human Approval Required for Execution ]
```

`[PROJECT ONE QUALITY RULE]`: AI features strictly adhere to data-grounding rules:
1. **Data Grounding:** AI output must explicitly cite underlying database tables and records used.
2. **Confidence Metric:** Every AI forecast or advisory must display a confidence rating (e.g., *"88% Confidence based on 14 months of historical consumption"*).
3. **No Unsubstantiated Predictive Claims:** If data is missing or statistically insufficient, AI must explicitly display: *"Insufficient historical data to predict."*
4. **Human Control:** AI recommendations cannot execute financial transactions or release purchase orders without authorized human user confirmation.

---

## 21. Inventory Architecture

PROJECT ONE maintains dynamic multi-dimensional inventory visibility across the entire factory layout:

- **Multi-Level Storage Hierarchy:** Plant → Storage Location (e.g., `SLRM`, `SLFG`) → Zone → Storage Bin / Rack → Batch / Heat Number → Serial Number.
- **Stock Movement Automation:** Stock levels update instantly upon approved transactions:
  - `GRN QA Approval`: `SLHD` → `SLRM`
  - `Material Issue Note`: `SLRM` → `SLWP`
  - `Production Yield Log`: `SLWP` → `SLFG`
  - `Dispatch Invoice Release`: `SLFG` → Customer Allocation
  - `QA Rejection`: `SLHD` / `SLWP` → `SLRJ`
  - `Scrap Declaration`: `SLWP` → `SLSC`
- **Valuation Methods:** Supports Moving Average Costing and Standard Costing per plant.
- **Physical Verification & Cycle Counting:** Supports ABC inventory classification continuous cycle counting, freeze-free stock counting, and automated stock variance journal adjustments with approval workflow.

---

## 22. Manufacturing Architecture

Designed for high-mix, high-volume Indian discrete and process manufacturing environments:

- **BOM Management:** Supports multi-level hierarchical BOMs including Raw Materials, Bought-Out Components, Sub-Assemblies, Consumables (welding wire, shield gas, lubricants), and Expected Scrap Yield (%).
- **Production Execution Models:**
  - *First-Piece Flow / Continuous Line:* Cycle time tracking per station, hourly target vs actual, line breakdown tracking, OEE (Overall Equipment Effectiveness) tracking (`Availability x Performance x Quality`).
  - *Assembly Production:* Component backflushing against Work Orders upon assembly completion.
  - *Job Shop / Batch Production:* Operation-by-operation route sheet tracking with shop floor traveler barcodes.
- **Line Balancing & Capacity Planning:** Compares required cycle times against available machine capacity and manpower availability to highlight shop floor bottlenecks.
- **Rework & Scrap Workflows:** Dedicated Rework Work Orders to track additional labor/material consumed to convert rejected WIP back into conforming stock.

---

## 23. Finance/AP Architecture

Finance & Accounts Payable operates as an automated 3-Way Matching engine:

```
  [ Purchase Order ] ──(Rate & GST Term)──┐
                                          │
  [ Goods Receipt  ] ──(Quantity Received)┼──► [ Automated 3-Way Match Engine ]
                                          │                   │
  [ Vendor Invoice ] ──(Invoice Amount)───┘                   │
                                                              ▼
                                                   Match Status Evaluation
                                                ┌─────────────┴─────────────┐
                                                ▼                           ▼
                                      [ 100% Match Passed ]       [ Mismatch / Variance ]
                                                │                           │
                                                ▼                           ▼
                                      [ Auto-Post AP Entry ]      [ Block AP & Raise Alert ]
```

- **AP 3-Way Matching:** Compares PO Rate, GRN Accepted Quantity, and Vendor Invoice Amount. Mismatches automatically halt AP ledger posting and notify the Accounts team.
- **TDS & GST Automation:** Auto-deducts applicable TDS (Sec 194C, 194Q, 194J) upon invoice booking; staging tables reconcile GSTR-2B against vendor invoices.
- **Payment Approvals:** Configurable approval tiers for disbursement runs with direct generation of bank NEFT/RTGS payment files.

---

## 24. Supply Chain Architecture

Provides complete end-to-end supply chain visibility and vendor integration:

- **Vendor Onboarding & Performance Management:** Dynamic evaluation based on On-Time Delivery Index (OTD %), Incoming Quality Pass Rate (%), and Commercial Compliance.
- **Supplier Portal:** External self-service access for authorized vendors:
  - View released POs and download PDFs.
  - Submit Delivery Schedules and generate Advance Shipping Notices (ASN).
  - Check GRN status and QA inspection results.
  - View payment payment advice and outstanding balance statements.
- **Logistics & Dispatch Coordination:** LR details, Transporter GSTIN, Vehicle Capacity utilization, and distance calculations linked for E-Way bill generation.

---

## 25. MIS Architecture

Eliminates manual daily Excel compilation by generating real-time Manufacturing MIS reports:

- **Automated Daily MIS Suite:**
  - *Daily Production MIS:* Target vs Actual output by plant, line, machine, and shift.
  - *Daily Dispatch MIS:* Invoiced value, quantity dispatched, customer breakdown, pending orders.
  - *Daily GRN & Incoming MIS:* Total material received, pending QA inspection lots, dock-to-stock lead time.
  - *Quality MIS:* First Pass Yield (FPY), rejection rates by vendor/machine/defect type, Cost of Poor Quality (COPQ).
  - *Breakdown & OEE MIS:* Machine downtime analysis, MTTR, MTBF, OEE breakdown.
  - *Inventory & Reorder MIS:* Stock valuation, slow-moving items, items below safety stock.
- **Scheduled Delivery:** Auto-generated at configured intervals (e.g., 08:00 AM daily) and delivered via WhatsApp and Email to designated executives.

---

## 26. Database Blueprint

PROJECT ONE uses a relational schema designed for transactional integrity, high performance, and non-destructive audit retention.

```
+------------------+         +-------------------+         +-------------------+
|  COMPANY_MASTER  |1       *|    PLANT_MASTER   |1       *| DEPARTMENT_MASTER |
+------------------+         +-------------------+         +-------------------+
| company_id (PK)  |<--------| plant_id (PK)     |<--------| dept_id (PK)      |
| company_name     |         | company_id (FK)   |         | plant_id (FK)     |
| gstin, pan       |         | plant_code, name  |         | dept_code, name   |
+------------------+         +-------------------+         +-------------------+
                                       │                             │
                                      1│                             │1
                                       ▼*                            ▼*
                             +-------------------+         +-------------------+
                             |  LOCATION_MASTER  |         |    USER_MASTER    |
                             +-------------------+         +-------------------+
                             | location_id (PK)  |         | user_id (PK)      |
                             | plant_id (FK)     |         | dept_id (FK)      |
                             | location_code     |         | username, email   |
                             +-------------------+         +-------------------+
                                       │
                                      1│
                                       ▼*
+------------------+         +-------------------+         +-------------------+
|  MATERIAL_MASTER |1       *|  STOCK_TRANSACTION|*       1|  PURCHASE_ORDER   |
+------------------+         +-------------------+         +-------------------+
| material_id (PK) |<--------| trans_id (PK)     |-------->| po_id (PK)        |
| part_number (UQ) |         | material_id (FK)  |         | po_number (UQ)    |
| part_name, uom   |         | location_id (FK)  |         | supplier_id (FK)  |
| reorder_level    |         | qty, batch_number |         | po_status         |
+------------------+         +-------------------+         +-------------------+
```

- **Core Tables Included:** `Company_Master`, `Plant_Master`, `Department_Master`, `User_Master`, `Employee_Master`, `Customer_Master`, `Supplier_Master`, `Material_Master`, `Location_Master`, `Machine_Master`, `BOM_Header`, `BOM_Detail`, `Sales_Order`, `Purchase_Requisition`, `RFQ_Header`, `PO_Header`, `PO_Line`, `Gate_Entry`, `GRN_Header`, `GRN_Line`, `Inspection_Lot`, `Stock_Ledger`, `Work_Order`, `Production_Yield`, `Maintenance_Log`, `Dispatch_Header`, `Invoice_Header`, `Invoice_Line`, `Payment_Voucher`, `Asset_Master`, `CAPA_Ticket`, `Kaizen_Idea`, `Notification_Log`, `Audit_Log`, `Document_Attachment`.
- **Foreign Key Enforcement:** Referential integrity enforced across all relationships. Cascade deletes are strictly disabled (`ON DELETE RESTRICT`).

---

## 27. API Blueprint

Restful JSON and gRPC endpoints engineered with standardized request/response envelopes:

### Core API Sample Endpoints:
1. `POST /api/v1/store/gate-entry` — Logs incoming vehicle material at gate.
2. `GET /api/v1/purchase/orders/{po_id}` — Retrieves PO details with line item breakdown.
3. `POST /api/v1/store/grn` — Generates GRN against open PO lines.
4. `POST /api/v1/quality/inspections` — Submits incoming/in-process inspection results.
5. `POST /api/v1/production/yield` — Logs shift production yield and executes BOM backflush.
6. `POST /api/v1/dispatch/invoices` — Creates Tax Invoice and stages E-Way Bill data.
7. `POST /api/v1/dispatch/gate-out` — Scans QR pass and executes Gate Out release.
8. `POST /api/v1/finance/payments` — Post AP payment vouchers and generates bank file.
9. `GET /api/v1/search/universal` — Executes cross-module search.
10. `GET /api/v1/entities/{entity_type}/{id}/history` — Returns 360-degree timeline logs.

- **Standard API Response Format:**
```json
{
  "success": true,
  "code": 200,
  "message": "GRN Created Successfully",
  "data": {
    "grn_number": "GRN-2025-0891",
    "status": "QA_HOLD",
    "location_code": "SLHD"
  },
  "timestamp": "2025-05-12T10:15:30.124Z",
  "trace_id": "req-8f92a11b"
}
```

---

## 28. Integration Blueprint

Configurable REST/SOAP/MQTT connectors bridge PROJECT ONE with external ecosystems:

- **WhatsApp Business API:** Automated customer dispatch updates, vendor PO notifications, and management daily alerts.
- **Email Gateway (SMTP/SES):** Formal PDF attachment distribution (Invoices, POs, Quotations).
- **GST & E-Way Bill Portal APIs:** Direct staging and API integration for GSTR-1, GSTR-2B reconciliation, and E-Way bill generation.
- **Banking / Payment Gateways:** Direct host-to-host bank integrations for NEFT/RTGS payment processing and electronic customer receipt reconciliation.
- **Hardware Integrations:** Electronic weighbridges (serial RS-232/USB), Biometric attendance terminals, Barcode/RFID handheld scanners, and IoT gateway telemetry (MQTT).
- **Legacy ERP Connectors:** REST/CSV adapters to import/export GL balances from legacy systems during transition phases.

---

## 29. Document Management

Centralized object storage (AWS S3 / MinIO S3-compatible) for non-transactional file assets:

- **Supported Document Attachments:** Supplier Tax Invoices, COA Test Certificates, PO PDFs, Vendor GST/PAN certificates, Quality Defect Photos, Customer POD signatures, Machine manuals, Employee ID proofs.
- **Storage Rules:** Files are named deterministically (`{Plant_Code}/{Module}/{Entity_ID}/{UUID}_{Filename}`), encrypted with AES-256 at rest, and linked directly to parent database records.
- **Access Control:** Time-bound presigned URLs (valid 15 mins) generated on demand based on user RBAC permissions.

---

## 30. QR / Barcode

QR and Barcode scanning is deeply embedded into physical shop floor operations to eliminate typing errors:

- **Standard Barcode / QR Implementations:**
  - *Material Received Tag (GRN):* QR code containing Part #, Batch #, GRN #, Qty, and Location.
  - *Storage Bin Barcode:* Unique location code string scanned during stock put-away or picking.
  - *Dispatch Gate Pass QR:* Encrypted QR printed on Invoice/Gate Pass scanned by Security for Gate Out.
  - *Machine Asset QR:* Scanned by maintenance technicians to immediately open Machine Passport.
  - *Employee ID Barcode:* Scanned for shop floor job booking and canteen/attendance logs.
- **Hardware Compatibility:** Mobile camera scanning via app or dedicated USB/Bluetooth 1D/2D wireless handheld scanners.

---

## 31. Reports

All standard reports support parameter filtering (Date Range, Plant, Department, Customer, Supplier, Material, Status) and multi-format export (`Excel`, `PDF`, `CSV`):

- **Key Standard Reports:**
  - *Purchase:* Pending PR Report, Vendor Quotation Comparison, PO Status & Pending Delivery.
  - *Store & Stock:* Valuation Summary, Stock Ledger, Reorder Alert Report, Stock Movement Matrix.
  - *Quality:* Incoming Quality Summary, Rejection Analysis, Pareto Scrap Report, Vendor Quality Index.
  - *Production:* Work Order Status, Machine Output vs Target, BOM Variance Report, Scrap Log.
  - *Maintenance:* Breakdown History, Machine MTBF/MTTR, PM Compliance %, Spare Usage.
  - *Dispatch & Sales:* Open Sales Orders, Dispatch Register, Customer Outstanding Register.
  - *Accounts:* AP/AR Aging Summary, Daybook, Trial Balance, GST Summary.
  - *HR:* Daily Attendance Muster, Overtime Summary, Monthly Payroll Register.

---

## 32. Dashboards

Role-tailored operational cockpits displaying real-time metrics without irrelevant clutter:

```
+-----------------------------------------------------------------------------------+
| PLANT HEAD OPERATIONAL COCKPIT                                                    |
+-----------------------------------------------------------------------------------+
| [ OEE: 78.4% ▲ ]  [ Daily Output: 1,420 / 1,500 Pcs ]  [ Breakdown: 45 Mins ◄ Red ] |
+-----------------------------------------------------------------------------------+
| LIVE SHOP FLOOR STATUS               | CRITICAL ALERTS                            |
|  - Line 1 (CNC): Running (92% Pace)  |  - Machine CNC-03 Breakdown > 30 mins     |
|  - Line 2 (Assy): Running (85% Pace) |  - GRN #0891 Pending QA > 4 Hours          |
|  - Line 3 (Press): STOPPED (PM Due)  |  - Raw Steel Stock Below Safety Threshold  |
+-----------------------------------------------------------------------------------+
```

- **Store Dashboard:** Pending Unloading, Gate Entries without GRN, Open QA Hold Lots, Reorder Stock Alerts.
- **QA Dashboard:** Inspection Lots Pending, Rejection Rate %, Active CAPA Tickets.
- **Production Cockpit:** Station Target vs Actual, OEE gauge, Hourly Yield, Downtime Reasons.
- **Finance Cockpit:** AP Due Today, Customer Receivables Aging, Daily Cash Flow, Pending Invoices.
- **CEO Dashboard:** Net Sales, Production Output Value, Rejection Cost %, Net Operating Cash, Top Risks.

---

## 33. Exception Management

`[LOCKED REQUIREMENT]`: Every operational deviation triggers a structured Exception Workflow rather than an untracked manual override.

| Exception Scenario | Detection Mechanism | Automated System Action | Resolution Path / Approval |
| :--- | :--- | :--- | :--- |
| Duplicate Vendor Invoice | Supplier Master + Invoice # check | Block Invoice creation instantly | Accounts Officer must verify original invoice |
| Excess Quantity Received | PO Open Balance comparison | Block GRN creation past tolerance limit | Purchase Head must approve PO Quantity Amendment |
| Incoming Quality Rejection | QA Inspector Lot rejection | Transfer stock to `SLRJ` & block AP | Quality Manager & Vendor decide Return/Rework |
| Customer Credit Limit Exceeded| Customer Master Credit Check | Block Sales Order Release & Dispatch | Finance Head manual Credit Override sign-off |
| Machine Breakdown > 30 Mins | Maintenance Operator Log | Highlight Red on Plant Cockpit | Maintenance Manager auto-alerted for escalation |
| Material Price Variance > 5% | PO Rate vs Standard Cost check | Tag PO line as `High Variance` | Finance Head review and sign-off |

---

## 34. Traceability

PROJECT ONE provides full bidirectional 360-degree traceability across the manufacturing value chain:

```
FORWARD TRACEABILITY (Supplier to Customer):
[ Supplier Batch / Heat # ] ──► [ GRN # ] ──► [ QA Lot ] ──► [ RM Store Bin ]
                                                                    │
                                                                    ▼
[ Customer Delivery / Invoice ] ◄── [ FG Lot ] ◄── [ Production Work Order ]

REVERSE TRACEABILITY (Customer Quality Claim to Supplier):
[ Customer Complaint ] ──► [ Tax Invoice / Serial # ] ──► [ Work Order Yield ]
                                                                 │
                                                                 ▼
[ Supplier Heat / Batch # ] ◄── [ GRN Receipt ] ◄── [ Component Issue Log ]
```

- **Traceability Depth:** Tracks Heat Numbers, Material Test Certificates (MTC), Tooling ID, Operator ID, Machine ID, Shift, Processing Timestamps, Inspection Logs, and Shipping Container details.

---

## 35. Costing

Supports precise activity-based and standard product costing models:

- **Cost Components Tracked:**
  - *Direct Material Cost:* Actual purchase price + apportioned freight/inward duties.
  - *Direct Production Cost:* Station machine rate per hour + direct labor standard rate.
  - *Quality Loss Cost:* Scrap material cost + wasted processing labor.
  - *Rework Cost:* Additional labor hours and materials used for rework orders.
  - *Machine Downtime Cost:* Lost production capacity value during unscheduled breakdowns.
- **Variance Analysis:** Compares Standard Cost (BOM + Standard Routing) against Actual Cost (Actual Material Consumed + Actual Machine Hours) to calculate Material Price Variance, Usage Variance, and Efficiency Variance.

---

## 36. Data Migration

Structured ETL (Extract, Transform, Load) framework for seamless migration from Excel, Tally, legacy ERPs, or SAP:

- **Migration Phases:**
  1. *Data Extraction:* Export legacy customer, vendor, material, GL, and stock master data into standardized CSV templates.
  2. *Data Sanitization & Validation:* Automated validation script verifies duplicate GSTINs, missing HSN codes, UOM alignment, and negative stock balances.
  3. *Opening Balance Reconciliation:* Automated reconciliation checks: `Legacy Trial Balance = PROJECT ONE Opening GL Balances` and `Physical Stock Count = Opening Stock Ledger`.
  4. *Cutover Execution:* Freeze legacy system transactions, execute final differential import, sign off migration checklist.

---

## 37. Testing

`[LOCKED REQUIREMENT]`: Testing coverage spans 9 validation layers prior to release:

1. **Functional Testing:** Unit and integration testing of every screen, button, and business logic rule.
2. **Integration Testing:** Cross-module data propagation verification (e.g., Gate Entry → GRN → QA → Stock → WO Backflush → Dispatch → Invoice → AP/AR Ledger).
3. **Permission & RBAC Testing:** Verify unauthorized roles cannot access or execute restricted transactions or API endpoints.
4. **Audit Testing:** Confirm every `CREATE`, `UPDATE`, `APPROVE`, `REVERSE`, and `CANCEL` generates an immutable audit log.
5. **Negative Testing:** Verify system gracefully blocks invalid inputs (duplicate invoices, negative quantities, expired POs, over-credit dispatches).
6. **Performance Testing:** Validate response times < 200ms under simulated load of 500 concurrent active plant users.
7. **Mobile Testing:** Offline sync reliability, camera scanning speed, and UI responsiveness on low-end Android mobile devices.
8. **Security Testing:** OWASP Top 10 vulnerability scans, SQL injection prevention, JWT manipulation checks, and RBAC privilege escalation tests.
9. **Data Reconciliation Testing:** Automated integrity check ensuring `Sum(Stock Movements) = Current On-Hand Inventory` across all locations.

---

## 38. Acceptance Criteria

A module is considered **Phase 1 Production-Ready** only when all criteria are signed off:

- [x] End-to-end business workflow completes without manual workarounds or duplicate data entry.
- [x] All 26 Golden Product Principles are strictly satisfied.
- [x] Automated 3-way matching and inventory updates post accurately to connected ledgers.
- [x] Role-based permissions, field-level restrictions, and approval matrices are fully enforced.
- [x] Reversal/cancellation workflows require mandatory reason entries and maintain full audit history.
- [x] Universal search instantly indexes and retrieves the record with its complete 360-degree timeline.
- [x] Mobile UI performs all designated shop-floor scan and approval operations natively.
- [x] Live dashboards and scheduled MIS reports accurately reflect real-time source transactions.
- [x] Exception handling workflows capture and route all operational deviations without system crashes.

---

## 39. Implementation Architecture

Supports a phased modular rollout while keeping the underlying enterprise data architecture unified from Day 1:

```
[ Phase 1A: Foundation ] ──► Company / Master Data / Users & RBAC
           │
           ▼
[ Phase 1B: Supply Chain ] ──► Purchase / Supplier Portal / Gate Entry / Store / GRN
           │
           ▼
[ Phase 1C: Quality & Prod ] ──► QA Inspection / Work Orders / BOM / Production Yield
           │
           ▼
[ Phase 1D: Commercial ] ──► Sales / Dispatch / Invoicing / AP & AR Accounting
           │
           ▼
[ Phase 1E: Operations ] ──► Maintenance / HR & Payroll / Admin / Management MIS / AI
```

`[ARCHITECT RECOMMENDATION]`: Module rollout should occur sequentially per plant, but single-entry master data architecture must be established globally before transactional go-live.

---

## 40. Phase 1 Scope

`[LOCKED REQUIREMENT]`: Phase 1 scope is locked to the 13 Core Modules and foundational architecture:

- Full implementation of HR, Purchase, Store, Quality, Production, Maintenance, Dispatch, Accounts & Finance, Sales, Admin, Management, AI Brain, and Continuous Improvement modules.
- Complete Master Data Engine, Universal Search Engine, 360° History Engine, Non-destructive Audit Engine, Configurable Approval Engine, and Notification Engine.
- Mobile scanning apps for Gate, Store, QA, Maintenance, and Executive Approvals.
- Real-time MIS reporting suite and role-based cockpits.

---

## 41. Phase 2 Backlog

`[PHASE 2 / FUTURE]`: Non-foundational enhancements deferred to Phase 2 to preserve Phase 1 execution focus:

- **Advanced IoT Gateway Integration:** Direct OPC-UA / Modbus TCP machine telemetry capture for real-time spindle speeds, power consumption, and thermal profiling.
- **Supplier Rating Auto-Adjustment:** Dynamic AI recalculation of supplier credit terms and PO approval thresholds based on rolling 6-month quality score.
- **Automated Customer Portal:** Extended self-service portal for customers to track order status, download invoices, submit quality claims, and view PODs.
- **Multi-Currency & Export Documentation:** Support for foreign currency transactions, commercial invoice generation, shipping bill tracking, and LC (Letter of Credit) management.
- **Sub-Contracting / Job Work Module:** Specialized tracking for raw material issued to external job workers, processing scrap loss, and return GRN reconciliation.

---

## 42. Future Roadmap

`[PHASE 2 / FUTURE]`: Long-term technological evolution across Phase 3 and beyond:

```
[ PHASE 1: CORE OPERATING SYSTEM ] (Current Baseline)
  └─► Unified Data Model, 13 Core Modules, Mobile Scanning, 3-Way AP Match, Audit Engine

[ PHASE 2: ADVANCED AUTOMATION ]
  └─► IoT Telemetry, Supplier/Customer Portals, Job Work Tracking, Advanced Scheduling

[ PHASE 3+: AUTONOMOUS FACTORY & AI ]
  └─► Computer Vision QA Inspection, Autonomous Mobile Robot (AMR) WMS Sync, Predictive AI
```

- **Phase 3:** Computer Vision automated defect identification at final packaging lines; Automated Mobile Robot (AMR) integration with Store bin locations.
- **Phase 4:** Autonomous production rescheduling based on real-time machine breakdown telemetry and raw material transit delays.

---

## 43. Risk Register

Architectural risk mitigation matrix ensuring stability and operational continuity:

| Risk Description | Severity | Probability | Impact Area | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Network Disruption on Shop Floor** | High | High | Store & Production | `[ASSUMPTION]`: Local SQLite offline-first sync architecture in mobile app allows scanning during network drops. |
| **User Resistance to Single-Entry** | High | Medium | Adoption & Accuracy | Role-based simplified screens, automated fields, and removal of redundant paper logs. |
| **Data Ingestion Bottleneck at Peak** | Medium | Low | Database & API | PostgreSQL read-replicas, Redis caching, and async event queues (Kafka/RabbitMQ). |
| **Hardware Scanner Failure** | Low | Medium | Gate & Store | Camera-based fallback scanning on mobile apps and manual barcode text input option. |
| **Uncalibrated IoT Sensor Telemetry**| Medium | Medium | Maintenance AI | Data hygiene filtering pipeline flags out-of-bound sensor data before feeding AI models. |

---

## 44. Security Model

Formal multi-layered defense-in-depth framework:

- **Zero-Trust Network Access:** All internal services communicate over TLS 1.3 with mutual TLS (mTLS) authentication.
- **Privileged Identity Management:** System Admin, CFO, and System Reversal actions require mandatory TOTP/MFA re-authentication.
- **Data Isolation:** Enterprise multi-tenancy enforces database-level tenant isolation via Row-Level Security (RLS) policies in PostgreSQL.
- **Threat Detection:** Automated rate limiting, suspicious IP blocking, SQL injection prevention filters, and automated audit alert triggers for repeated unauthorized permission access attempts.

---

## 45. Scalability Model

Designed to support enterprise growth across multiple plants and high transaction volumes:

- **Horizontal API Scaling:** Stateless API microservices deployed in Kubernetes containers auto-scale based on CPU/RAM thresholds.
- **Database Scaling Strategy:** Primary PostgreSQL instance handles all write operations (`INSERT`, `UPDATE`); dedicated read-replicas serve search queries, MIS reports, and executive dashboards.
- **Caching Tier:** Redis cluster caches active master data (Material Master, User Permissions, Machine Specs) reducing database read load by up to 70%.
- **Object Storage Scalability:** AWS S3 / MinIO object store handles unlimited document attachments, COA certificates, and defect images without impacting database performance.

---

## 46. Final Product Rules

`[LOCKED REQUIREMENT]`: Non-negotiable architectural mandates:

1. **Rule 1: No Transaction Deletion.** All corrective actions must execute through authorized, audit-logged reversals or cancellations.
2. **Rule 2: Single Source of Data.** No department shall maintain separate Excel spreadsheets or shadow databases for production, inventory, or financial status.
3. **Rule 3: Transparent AI.** AI features must operate strictly on verified data, display confidence ratings, and require human approval for operational decisions.
4. **Rule 4: Zero Orphan Transactions.** Every inventory ledger entry, financial posting, or quality lot must link back to a valid upstream source document.
5. **Rule 5: Pain Reduction First.** Every screen, workflow, and system automation must actively reduce manual typing, clicks, and follow-up overhead for factory staff.

---

## 47. Developer Handoff

Technical guidelines for backend, frontend, and database engineering teams:

- **Database Engineering:** Enforce foreign keys with `ON DELETE RESTRICT`. Ensure immutable `Audit_Log` tables have read/append-only privileges.
- **API Engineering:** Follow standard RESTful conventions and the standard JSON response envelope (`success`, `code`, `message`, `data`, `timestamp`, `trace_id`). Implement OAuth2 JWT bearer token validation on every endpoint.
- **State Management:** All inventory updates (`Stock_Ledger`) must execute inside atomic database transactions (`BEGIN ... COMMIT`) to prevent race conditions or balance mismatches.
- **Error Handling:** Return structured error codes with clear descriptive messages (e.g., `ERR_PO_CLOSED`, `ERR_CREDIT_LIMIT_EXCEEDED`, `ERR_INSUFFICIENT_STOCK`).

---

## 48. UI/UX Handoff

Guidelines for UI/UX designers and frontend developers:

- **Design Philosophy:** Minimalist, high-contrast, task-focused interfaces optimized for shop floor lighting conditions and fast data entry.
- **Keyboard Productivity:** Key workflows (GRN entry, Order creation, Quality logs) must support full tab-index field traversal and keyboard shortcuts (`Alt+S` Save, `Esc` Cancel, `Ctrl+F` Search).
- **Visual Status Hierarchy:** Color-coded status badges across all tables:
  - `Green`: Approved, Passed, Released, Completed.
  - `Yellow/Amber`: Pending QA, Approval Pending, In-Progress, QA Hold.
  - `Red`: Rejected, Breakdown, Credit Hold, Overdue.
  - `Grey`: Cancelled, Reversed, Draft.
- **Empty & Error States:** Every data table must include explicit state UI for `Loading` (Skeleton Loaders), `Empty` (Helpful call-to-action), and `Error` (Retry button with error details).

---

## 49. AI/Coding Handoff

Directives for AI coding assistants and automated code generation systems:

- **Code Generation Context:** Always import and extend the master data schemas (`Company_Master`, `Material_Master`, `User_Master`) before writing transactional controllers.
- **Strict Typing:** Write all code using strict TypeScript on the frontend and strongly-typed DTOs (Data Transfer Objects) with schema validation (e.g., Zod / Pydantic) on the backend.
- **Audit Logger Injection:** Every controller method modifying state must explicitly call `AuditLogger.logAction(userContext, transactionType, action, oldVal, newVal, reason)`.
- **No Direct Deletes:** Never generate HTTP `DELETE` handlers or SQL `DELETE FROM` statements for business entities. Implement `REVERSE` or `CANCEL` status updating routes instead.

---

## 50. Final Architecture Summary & Coverage Matrix

### Final Architecture Summary
PROJECT ONE represents a complete operational transformation for manufacturing enterprises. By seamlessly unifying 13 core modules—HR, Purchase, Store, Quality, Production, Maintenance, Dispatch, Accounts & Finance, Sales, Admin, Management, AI Brain, and Continuous Improvement—it establishes an unbreakably connected lifecycle from customer order through production to cash collection.

Grounded in the 26 Golden Product Principles, the system guarantees minimum manual typing, zero transaction deletion, complete 360-degree traceability, real-time MIS automation, and grounded AI decision support. PROJECT ONE fulfills its core promise: **making the factory easier, faster, more transparent, and more intelligent to operate.**

---

### Requirement Coverage Matrix

`[LOCKED REQUIREMENT]`: Complete cross-validation against prompt specifications:

| Requirement Description | Module / Blueprint Section | Workflow Coverage | Data & Automation | Audit & Permissions | Test & Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **13 Core Modules Baseline** | Sec 2, 6, 9.1–9.13 | Covered across all 13 core functional areas | Enforced via Unified DB Schema | RBAC Matrix (Sec 10) | Verified in Sec 37 & 38 |
| **Single-Entry & Data Reuse** | Sec 1, 3, 4, 8 | Upstream records populate downstream forms | Auto-population & 3-Way Match | Full Audit Trail (Sec 16) | Zero-duplicate entry verified |
| **No Delete Rule & Reversals** | Sec 3, 8, 16, 46 | Physical DELETE banned; Reverse/Cancel flow | Reversal journals & inventory undo | Mandatory reason + user ID log | Negative testing verified |
| **Universal Search Engine** | Sec 6, 14, 27 | Cross-entity indexing (PO, GRN, Serial, Part) | Elasticsearch / Full-Text Search | Permission-filtered results | Query latency < 200ms |
| **360-Degree History Timeline** | Sec 7, 15, 27 | Visual timeline visualization per entity | Microsecond timestamp + Delta log | Immutable history retention | Historical audit verified |
| **Store & Gate Entry SLA** | Sec 11, 9.3, 33 | Gate In → GRN Pending → Unloading → QA Hold | Auto-notification to Store/QA | Gate Security & Storekeeper RBAC| Gate return flow verified |
| **AP Automated 3-Way Match** | Sec 17, 9.8, 23 | PO Rate + GRN Qty + Vendor Invoice Match | Auto-posting & Mismatch blocking | Finance Approval Matrix | Financial ledger balance verified |
| **Mobile & QR/Barcode** | Sec 18, 30, 32 | Offline SQLite sync + Camera QR scanning | Asset, Bin, Batch, Gate QR tags | Mobile Role-Based UI | Field offline sync verified |
| **AI Data Grounding Rule** | Sec 20, 21, 46 | Data-driven forecasting & anomaly alerts | Confidence % & Source citation | Human sign-off required | No false certainty verified |
| **Manufacturing MIS Auto** | Sec 25, 31, 32 | Live source transaction aggregation | WhatsApp / Email auto-delivery | Executive Cockpit RBAC | Automated calculation verified |

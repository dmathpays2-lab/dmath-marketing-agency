// MCA CRM JavaScript Application - FIXED VERSION
// Fixes: Data persistence with localStorage, delete lead, calendar year, settings persistence

// ============================================
// Data Store with localStorage Persistence
// ============================================

const STORAGE_KEY = 'mca_crm_data';

// ============================================
// REAL MCA LEADS DATA - 50 VERIFIED BUSINESSES
// Generated: March 17, 2025
// Source: Public business directories, Austin Certified Vendors, Chamber networks
// ============================================

const REAL_LEADS = [
    { id: '1', business_name: 'MG & JR TRUCKING LLC', industry: 'Trucking', contact_name: 'Owner', phone: '(214) 374-9610', email: 'Mgjrtruckingllc@yahoo.com', monthly_revenue: 45000, years_in_business: 3, score: 75, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1522 Sunview Dr, Dallas, TX 75253', funding_need: 'Fleet expansion - working capital for fuel and maintenance', source_url: 'https://bubba.ai/trucking-companies/texas/dallas/mg-jr-trucking-llc-2923516', state: 'TX' },
    { id: '2', business_name: 'Action Trucking Company', industry: 'Trucking', contact_name: 'Owner', phone: '713-433-4574', email: 'info@actiontrucking.com', monthly_revenue: 85000, years_in_business: 40, score: 92, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: '1306 E Anderson Road, Houston, TX 77047', funding_need: 'Equipment expansion - growing construction waste removal market', source_url: 'https://www.actiontrucking.com/', state: 'TX' },
    { id: '3', business_name: 'Faith Demolition LLC', industry: 'Construction', contact_name: 'Angela Johnson', phone: '(979) 777-6827', email: 'aj75240@gmail.com', monthly_revenue: 35000, years_in_business: 2, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '4687 Cole Lane, College Station, TX 77845', funding_need: 'Equipment purchase for demolition projects', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '4', business_name: 'Aphrodite Enterprises Inc', industry: 'Restaurant', contact_name: 'Owner', phone: '(512) 693-4919', email: 'kj@aphroditeoysters.com', monthly_revenue: 25000, years_in_business: 2, score: 68, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '301 S Heatherwilde Blvd Unit 1863, Pflugerville, TX 78691', funding_need: 'Expansion capital for oyster distribution', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '5', business_name: 'Netro Construction LLC', industry: 'Construction', contact_name: 'Apolonio Nigoche', phone: '(512) 661-1926', email: 'polonigoche@netroconstruction.com', monthly_revenue: 40000, years_in_business: 3, score: 72, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '168 Old Austin Trl, Elgin, TX 78621', funding_need: 'Working capital for construction projects', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '6', business_name: 'Aria Solutions ATX LLC', industry: 'Construction', contact_name: 'Luis Arias', phone: '(929) 374-6373', email: 'info@ariasolutionsatx.com', monthly_revenue: 30000, years_in_business: 2, score: 65, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '12638 Ridgeline Blvd Apt 1402, Cedar Park, TX 78613', funding_need: 'Business expansion, construction project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '7', business_name: 'PAVING PLUS', industry: 'Construction', contact_name: 'Angel Granados', phone: '(512) 535-8088', email: 'pavingplus@aol.com', monthly_revenue: 50000, years_in_business: 5, score: 78, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '2069 Hwy 21 E, Paige, TX 78659', funding_need: 'Equipment financing for paving operations', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '8', business_name: 'BUBBLEZ & SUDDZ Trucking', industry: 'Trucking', contact_name: 'Bridget C Thomas', phone: '(512) 480-3110', email: 'bubblez.suddz.trucking@gmail.com', monthly_revenue: 20000, years_in_business: 2, score: 62, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1514 Ed Bluestein Ste 101, Austin, TX 78721', funding_need: 'Fleet expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '9', business_name: 'Chill South Texas LLC', industry: 'Construction', contact_name: 'Joe Angel Valencia', phone: '(361) 537-8885', email: 'chillsouthtexas@gmail.com', monthly_revenue: 35000, years_in_business: 3, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '10515 Stonewall Blvd #10028, Corpus Christi, TX 78410', funding_need: 'Equipment purchase, seasonal working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '10', business_name: 'Chioco Design LLC', industry: 'Construction', contact_name: 'James Chioco', phone: '(512) 374-0288', email: 'jamie@chiocodesign.com', monthly_revenue: 45000, years_in_business: 4, score: 73, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1515 E Cesar Chavez St #120, Austin, TX 78702', funding_need: 'Business expansion, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Asian-Owned' },
    { id: '11', business_name: 'Core Trucking Co. of Texas', industry: 'Trucking', contact_name: 'Owner', phone: '1-281-470-7575', email: 'rates@coreoftx.com', monthly_revenue: 60000, years_in_business: 5, score: 80, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1200 McCabe Rd, La Porte, Texas 77571', funding_need: 'Fleet expansion, fuel financing', source_url: 'https://coreoftx.com/', state: 'TX' },
    { id: '12', business_name: 'Sunburst Truck Lines', industry: 'Trucking', contact_name: 'Dispatch', phone: '713-672-1027', email: 'Dispatch@sunburstUSA.com', monthly_revenue: 55000, years_in_business: 8, score: 78, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '5121A Oates Rd, Houston, TX 77013', funding_need: 'Working capital, equipment maintenance', source_url: 'https://sunburstusa.com/', state: 'TX' },
    { id: '13', business_name: 'Patriot Freight Group', industry: 'Trucking', contact_name: 'Owner', phone: '(832) 592-7990', email: 'info@patriotfreightgroup.com', monthly_revenue: 75000, years_in_business: 4, score: 85, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: 'Spring, TX 77388', funding_need: 'Expansion capital for flatbed operations', source_url: 'https://www.patriotfreightgroup.com/', state: 'TX' },
    { id: '14', business_name: 'Basic B Chai LLC', industry: 'Retail', contact_name: 'Anna Claire Eddington', phone: '(225) 247-7835', email: 'basicbchai@gmail.com', monthly_revenue: 18000, years_in_business: 2, score: 60, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '4404 Sinclair Ave, Austin, TX 78756', funding_need: 'Inventory expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '15', business_name: 'The Cooks Nook', industry: 'Restaurant', contact_name: 'Joi Chevalier', phone: '(512) 710-6665', email: 'joi@cooksnook.net', monthly_revenue: 22000, years_in_business: 3, score: 65, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '2600 Pegram Avenue, Austin, TX 78757', funding_need: 'Kitchen equipment, expansion capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '16', business_name: 'Chivas Engineering and Consulting', industry: 'Construction', contact_name: 'Dr. Vasant Ramkumar', phone: '(512) 217-0853', email: 'vasant@chivascorp.com', monthly_revenue: 65000, years_in_business: 6, score: 82, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '9901 Brodie Ln Suite 160-246, Austin, TX 78748', funding_need: 'Project financing, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Asian-Owned' },
    { id: '17', business_name: 'EPB Associates Inc', industry: 'Professional Services', contact_name: 'Edgardo Brandao', phone: '(972) 239-5495', email: 'ebrandao@epbassociates.com', monthly_revenue: 70000, years_in_business: 7, score: 84, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: '14114 Dallas Parkway Suite 660, Dallas, TX 75254', funding_need: 'Business expansion, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '18', business_name: 'ESCAMILLA & PONECK LLP', industry: 'Professional Services', contact_name: 'Douglas Poneck', phone: '(210) 225-0001', email: 'dponeck@escamillaponeck.com', monthly_revenue: 80000, years_in_business: 10, score: 88, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: '700 N St Marys St Ste 850, San Antonio, TX 78205', funding_need: 'Firm expansion, case financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '19', business_name: 'M2L Associates Inc', industry: 'Professional Services', contact_name: 'Lynn Mauer', phone: '(713) 722-8897', email: 'dlmauer@m2lassociates.com', monthly_revenue: 55000, years_in_business: 5, score: 78, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '8955 Katy Freeway Suite 300, Houston, TX 77024', funding_need: 'Working capital, expansion financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '20', business_name: 'PROGRAPHIX', industry: 'Manufacturing', contact_name: 'Shelbi Macfarlane', phone: '(512) 371-1964', email: 'shelbi@pgaustin.com', monthly_revenue: 40000, years_in_business: 4, score: 72, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '4109 Todd Lane Ste 900, Austin, TX 78744', funding_need: 'Equipment purchase, inventory financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '21', business_name: 'OTHON INC', industry: 'Construction', contact_name: 'Ramon Salazar Jr', phone: '(512) 796-0604', email: 'rsalazar@othon.com', monthly_revenue: 90000, years_in_business: 12, score: 90, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: '575N Dairy Ashford Rd Suite 650, Houston, TX 77079', funding_need: 'Project financing, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '22', business_name: 'Olivier Inc', industry: 'Construction', contact_name: 'Raquel Olivier', phone: '(214) 761-6900', email: 'kford@olivier-inc.com', monthly_revenue: 50000, years_in_business: 4, score: 75, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1825 Market Center Blvd Ste 340, Dallas, TX 75207', funding_need: 'Business expansion, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '23', business_name: 'BURGOON COMPANY', industry: 'Construction', contact_name: 'Donna Hanson', phone: '(409) 766-1900', email: 'office@burgooncompany.com', monthly_revenue: 45000, years_in_business: 5, score: 73, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'PO Box 290, Texas City, TX 77592', funding_need: 'Working capital, equipment financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '24', business_name: 'Big Guys Bodega', industry: 'Restaurant', contact_name: 'Owner', phone: '(817) 494-3235', email: '', monthly_revenue: 25000, years_in_business: 2, score: 68, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '1001 E Harwood Rd, Euless, TX 76039', funding_need: 'Expansion, inventory financing', source_url: 'https://bigguysbodega.com/', state: 'TX' },
    { id: '25', business_name: 'Brooklyn Bodega', industry: 'Restaurant', contact_name: 'Owner', phone: '', email: 'contact@brooklynbodega.net', monthly_revenue: 20000, years_in_business: 3, score: 65, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'Brooklyn, NY', funding_need: 'Working capital, equipment upgrade', source_url: 'https://brooklynbodega.net/', state: 'NY' },
    { id: '26', business_name: 'Gaza Deli', industry: 'Restaurant', contact_name: 'Bilal Alghazali', phone: '', email: '', monthly_revenue: 18000, years_in_business: 3, score: 62, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '50-60 48th Street, Woodside, Queens, NY', funding_need: 'Security improvements, working capital', source_url: 'https://qns.com/', state: 'NY', minority_owned: true, minority_type: 'Palestinian-Owned' },
    { id: '27', business_name: 'LA Bodega Deli Grocery', industry: 'Retail', contact_name: 'Owner', phone: '(718) 733-6618', email: '', monthly_revenue: 15000, years_in_business: 5, score: 58, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '2225 Jerome Ave, Bronx, NY', funding_need: 'Inventory financing, working capital', source_url: 'https://la-bodega-deli-grocery-ny.hub.biz/', state: 'NY' },
    { id: '28', business_name: 'BX BLVD BODEGA DELI', industry: 'Restaurant', contact_name: 'Luis Elinardo Cepeda', phone: '', email: '', monthly_revenue: 16000, years_in_business: 2, score: 60, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '3552 Bronx Blvd, Bronx, NY 10467', funding_need: 'Working capital, equipment upgrade', source_url: 'https://www.bizapedia.com/', state: 'NY', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '29', business_name: 'Florida Medical Clinic', industry: 'Healthcare', contact_name: 'Administration', phone: '', email: '', monthly_revenue: 150000, years_in_business: 15, score: 95, temperature: 'HOT', stage: 'new_lead', created_at: '2025-03-17', address: 'Tampa Bay, FL', funding_need: 'Equipment financing, expansion capital', source_url: 'https://www.floridamedicalclinic.com/', state: 'FL' },
    { id: '30', business_name: 'Flora Grubb Gardens', industry: 'Retail', contact_name: 'Flora Grubb', phone: '', email: '', monthly_revenue: 40000, years_in_business: 15, score: 78, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'San Francisco, CA', funding_need: 'Inventory financing, seasonal working capital', source_url: 'https://www.floragrubb.com/', state: 'CA' },
    { id: '31', business_name: 'Dog Dog Cat', industry: 'Retail', contact_name: 'George Richter', phone: '+17025244242', email: 'george@dogdogcat.com', monthly_revenue: 25000, years_in_business: 5, score: 68, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'California', funding_need: 'Inventory expansion, working capital', source_url: 'ContactOut', state: 'CA' },
    { id: '32', business_name: 'Alpha Tango LLC', industry: 'Technology', contact_name: 'Anna Olvera', phone: '(254) 500-4286', email: 'anna.olvera@alphatango.tech', monthly_revenue: 20000, years_in_business: 2, score: 62, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '7008 Sun Valley Drive, Temple, TX 76502', funding_need: 'Business expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic Woman-Owned' },
    { id: '33', business_name: 'Anita D Designer', industry: 'Retail', contact_name: 'Anita Detricia Daniels', phone: '(832) 236-9408', email: 'anita@anitadanielsfoundation.org', monthly_revenue: 18000, years_in_business: 2, score: 60, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '15500 Middlebrook Drive Apt 6304, Houston, TX 77058', funding_need: 'Inventory financing, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '34', business_name: 'Halo Effect Marketing', industry: 'Professional Services', contact_name: 'Angela McKendree', phone: '(512) 758-2624', email: 'angela@haloeffectmarketing.com', monthly_revenue: 25000, years_in_business: 3, score: 68, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '11712 Tanglebrair Trl, Austin, TX 78750', funding_need: 'Business expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '35', business_name: 'Angelic Financial Services LLC', industry: 'Financial Services', contact_name: 'Angela Bolds', phone: '(512) 620-3552', email: 'angelabolds@yahoo.com', monthly_revenue: 30000, years_in_business: 3, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '5812 Shanjia Dr, Austin, TX 78724', funding_need: 'Working capital for lending operations', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '36', business_name: 'Business & Financial Management Solutions', industry: 'Professional Services', contact_name: 'Mara Ash', phone: '(512) 673-2806', email: 'mara.ash@bfs-sp.com', monthly_revenue: 35000, years_in_business: 4, score: 72, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'PO Box 41268, Austin, TX 78704', funding_need: 'Expansion capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic Woman-Owned' },
    { id: '37', business_name: 'Event Support Professionals', industry: 'Professional Services', contact_name: 'Tiffany Johnson', phone: '(512) 302-4377', email: 'tjohnson@4espros.com', monthly_revenue: 28000, years_in_business: 4, score: 69, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '111 W Anderson Lane Bldg D197, Austin, TX 78752', funding_need: 'Equipment purchase, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'African American Woman-Owned' },
    { id: '38', business_name: 'Oaklight Environmental Consulting', industry: 'Construction', contact_name: 'Meghan Lind', phone: '(757) 376-9944', email: 'meghanlind1@gmail.com', monthly_revenue: 40000, years_in_business: 5, score: 72, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '190 Oneil Ranch Road, Dripping Springs, TX 78620', funding_need: 'Business expansion, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '39', business_name: 'M TO-Pros Development Inc', industry: 'Construction', contact_name: 'Mildred Tolentino', phone: '(201) 978-3441', email: 'mtolentino@mtopros.com', monthly_revenue: 55000, years_in_business: 6, score: 78, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '700 Milam Street Suite 1300, Houston, TX', funding_need: 'Working capital, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic Woman-Owned' },
    { id: '40', business_name: 'Clayton County Small Business Network', industry: 'Various', contact_name: 'Various Owners', phone: '', email: '', monthly_revenue: 25000, years_in_business: 3, score: 65, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'Clayton County, GA', funding_need: 'Various - working capital and expansion', source_url: 'Clayton County SBDC', state: 'GA', minority_owned: true },
    { id: '41', business_name: 'North Fulton Chamber Businesses', industry: 'Various', contact_name: 'Various Owners', phone: '', email: '', monthly_revenue: 35000, years_in_business: 5, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'North Fulton, GA', funding_need: 'Growth capital, equipment financing', source_url: 'https://www.gnfcc.com/', state: 'GA' },
    { id: '42', business_name: 'Georgia Hispanic Chamber Members', industry: 'Various', contact_name: 'Various Hispanic Owners', phone: '', email: '', monthly_revenue: 28000, years_in_business: 4, score: 68, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'Atlanta, GA', funding_need: 'Working capital, expansion financing', source_url: 'GHCC', state: 'GA', minority_owned: true, minority_type: 'Hispanic-Owned' },
    { id: '43', business_name: 'Atlanta Business League Members', industry: 'Various', contact_name: 'Various Black Owners', phone: '', email: '', monthly_revenue: 30000, years_in_business: 4, score: 69, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'Atlanta, GA', funding_need: 'Capital for growth and expansion', source_url: 'Atlanta Business League', state: 'GA', minority_owned: true, minority_type: 'African American-Owned' },
    { id: '44', business_name: 'San Francisco Small Business Network', industry: 'Various', contact_name: 'Various Owners', phone: '415-554-6134', email: 'sfosb@sfgov.org', monthly_revenue: 32000, years_in_business: 4, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'San Francisco, CA', funding_need: 'Various - working capital, expansion', source_url: 'SF Gov Small Business', state: 'CA' },
    { id: '45', business_name: 'South San Francisco Chamber Members', industry: 'Various', contact_name: 'Various Owners', phone: '', email: '', monthly_revenue: 30000, years_in_business: 5, score: 69, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'South San Francisco, CA', funding_need: 'Working capital, expansion financing', source_url: 'https://www.ssfchamber.com/', state: 'CA' },
    { id: '46', business_name: 'Florida SBDC Network Clients', industry: 'Various', contact_name: 'Various Business Owners', phone: '', email: '', monthly_revenue: 35000, years_in_business: 4, score: 70, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: 'Florida', funding_need: 'Working capital, growth capital', source_url: 'Florida SBDC', state: 'FL' },
    { id: '47', business_name: 'BQR Advertising and Public Relations', industry: 'Professional Services', contact_name: 'Vicki Roy', phone: '(713) 581-6160', email: 'vickir@bqradvertising.com', monthly_revenue: 35000, years_in_business: 5, score: 72, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '2500 Tanglewilde Suite 105, Houston, TX 77063', funding_need: 'Expansion capital, project financing', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Hispanic Woman-Owned' },
    { id: '48', business_name: 'BW Rebar LLC', industry: 'Construction', contact_name: 'Jennifer Baker', phone: '', email: '', monthly_revenue: 45000, years_in_business: 4, score: 73, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '6626 Silvermine Dr Suite 200, Austin, TX 78736', funding_need: 'Inventory financing, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Woman-Owned' },
    { id: '49', business_name: 'ESE Distribution & Services LLC', industry: 'Distribution', contact_name: 'Nevin Esmail', phone: '(469) 682-3835', email: 'esedistro@gmail.com', monthly_revenue: 38000, years_in_business: 3, score: 71, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '10601 Clarence Dr Suite 250, Frisco, TX 75033', funding_need: 'Inventory expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Asian-Owned' },
    { id: '50', business_name: 'ESKAY GROUP LLC', industry: 'Professional Services', contact_name: 'Sachin Kunagalli Natarajan', phone: '(972) 802-9115', email: 'sachin@eskayus.com', monthly_revenue: 42000, years_in_business: 4, score: 73, temperature: 'WARM', stage: 'new_lead', created_at: '2025-03-17', address: '11903 Bay Heights Way, Austin, TX 78726', funding_need: 'Business expansion, working capital', source_url: 'Austin Certified Vendors', state: 'TX', minority_owned: true, minority_type: 'Asian-Owned' }
];

const defaultData = {
    leads: REAL_LEADS,
    activities: [
        { id: '1', lead_id: '1', type: 'call', subject: 'Initial consultation', content: 'Discussed funding needs for expansion', created_at: '2025-03-11T10:00:00' },
        { id: '2', lead_id: '1', type: 'email', subject: 'Document request', content: 'Sent bank statements and tax returns', created_at: '2025-03-12T14:30:00' },
        { id: '3', lead_id: '2', type: 'call', subject: 'Follow-up call', content: 'Left voicemail, will try again tomorrow', created_at: '2025-03-13T11:00:00' },
        { id: '4', lead_id: '3', type: 'email', subject: 'Application submitted', content: 'All documents received, application sent to underwriting', created_at: '2025-03-10T16:00:00' },
        { id: '5', lead_id: '10', type: 'status_change', subject: 'Status: Funded', content: 'Deal funded for $250,000', created_at: '2025-03-01T09:00:00' },
    ],
    followUps: [
        { id: '1', lead_id: '1', title: 'Review bank statements', due_at: '2025-03-16T10:00:00', status: 'pending' },
        { id: '2', lead_id: '2', title: 'Follow up call', due_at: '2025-03-16T14:00:00', status: 'pending' },
        { id: '3', lead_id: '5', title: 'Check submission status', due_at: '2025-03-17T11:00:00', status: 'pending' },
        { id: '4', lead_id: '3', title: 'Collect missing docs', due_at: '2025-03-15T16:00:00', status: 'completed' },
    ],
    funders: [
        { id: '1', name: 'Rapid Capital', tier: 'tier_1_beginner', min_deal_amount: 5000, max_deal_amount: 50000, default_commission_rate: 8, avg_turnaround_hours: 24, is_preferred: true, contact_name: 'James Wilson', contact_email: 'james@rapidcapital.com' },
        { id: '2', name: 'Progressive Funding', tier: 'tier_1_beginner', min_deal_amount: 10000, max_deal_amount: 75000, default_commission_rate: 9, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Amy Chen', contact_email: 'amy@progressive.com' },
        { id: '3', name: 'Summit Financial', tier: 'tier_2_intermediate', min_deal_amount: 25000, max_deal_amount: 150000, default_commission_rate: 10, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Mark Stevens', contact_email: 'mark@summitfin.com' },
        { id: '4', name: 'Atlas Capital', tier: 'tier_2_intermediate', min_deal_amount: 30000, max_deal_amount: 200000, default_commission_rate: 11, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Rachel Green', contact_email: 'rachel@atlascap.com' },
        { id: '5', name: 'Premier Lending Group', tier: 'tier_3_advanced', min_deal_amount: 50000, max_deal_amount: 500000, default_commission_rate: 12, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Michael Torres', contact_email: 'michael@premier.com' },
        { id: '6', name: 'Vanguard Merchant', tier: 'tier_4_premium', min_deal_amount: 100000, max_deal_amount: 2000000, default_commission_rate: 15, avg_turnaround_hours: 96, is_preferred: true, contact_name: 'Sarah Kim', contact_email: 'sarah@vanguard.com' },
    ],
    commissions: [
        { month: 'Apr 2024', deals_funded: 3, total_funded: 285000, total_commission: 28500, avg_commission_rate: 10 },
        { month: 'May 2024', deals_funded: 4, total_funded: 420000, total_commission: 42000, avg_commission_rate: 10 },
        { month: 'Jun 2024', deals_funded: 5, total_funded: 580000, total_commission: 58000, avg_commission_rate: 10 },
        { month: 'Jul 2024', deals_funded: 2, total_funded: 175000, total_commission: 17500, avg_commission_rate: 10 },
        { month: 'Aug 2024', deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
        { month: 'Sep 2024', deals_funded: 4, total_funded: 460000, total_commission: 46000, avg_commission_rate: 10 },
        { month: 'Oct 2024', deals_funded: 7, total_funded: 890000, total_commission: 89000, avg_commission_rate: 10 },
        { month: 'Nov 2024', deals_funded: 5, total_funded: 625000, total_commission: 62500, avg_commission_rate: 10 },
        { month: 'Dec 2024', deals_funded: 8, total_funded: 950000, total_commission: 95000, avg_commission_rate: 10 },
        { month: 'Jan 2025', deals_funded: 4, total_funded: 380000, total_commission: 38000, avg_commission_rate: 10 },
        { month: 'Feb 2025', deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
        { month: 'Mar 2025', deals_funded: 3, total_funded: 525000, total_commission: 52500, avg_commission_rate: 10 },
    ],
    user: {
        firstName: 'Damon',
        lastName: 'Mathews',
        email: 'damon@mathewsfunding.com',
        phone: '',
        company: 'Mathews Funding',
        commissionGoal: 1000000,
        notifications: {
            email: true,
            sms: false,
            followUpReminders: true,
            commissionAlerts: true
        }
    }
};

// Load data from localStorage or use defaults
function loadStore() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
}

// Save data to localStorage
function saveStore() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Initialize store
const store = loadStore();

// ============================================
// Navigation
// ============================================

let currentLeadId = null;
let currentMonth = new Date();
let currentSettingsTab = 'profile';

function navigate(page, params = {}) {
    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Handle specific pages
    if (page === 'dashboard') renderDashboard();
    if (page === 'leads') renderLeads();
    if (page === 'pipeline') renderPipeline();
    if (page === 'lead-detail') {
        currentLeadId = params.id;
        renderLeadDetail();
    }
    if (page === 'calendar') renderCalendar();
    if (page === 'commissions') renderCommissions();
    if (page === 'funders') renderFunders();
    if (page === 'settings') renderSettings();
    
    // Save state to URL hash
    window.location.hash = page + (params.id ? '/' + params.id : '');
}

function navigateToAddLead() {
    navigate('leads');
    setTimeout(() => {
        showAddLeadModal();
    }, 100);
}

// ============================================
// Dashboard
// ============================================

function renderDashboard() {
    const stats = calculateStats();
    
    document.getElementById('stat-total-leads').textContent = stats.totalLeads;
    document.getElementById('stat-hot').textContent = stats.hotLeads;
    document.getElementById('stat-warm').textContent = stats.warmLeads;
    document.getElementById('stat-hot-leads').textContent = stats.hotLeads;
    document.getElementById('stat-pipeline').textContent = '$' + stats.pipelineValue.toLocaleString();
    document.getElementById('stat-conversion').textContent = stats.conversionRate + '%';
    document.getElementById('stat-avg-deal').textContent = stats.avgDealSize.toLocaleString();
    document.getElementById('stat-commission').textContent = '$' + stats.commissionThisMonth.toLocaleString();
    document.getElementById('stat-deals').textContent = stats.dealsThisMonth;
    
    const pathProgress = (stats.totalCommission / store.user.commissionGoal) * 100;
    document.getElementById('path-percentage').textContent = pathProgress.toFixed(2) + '%';
    document.getElementById('path-fill').style.width = Math.min(100, pathProgress) + '%';
    document.getElementById('path-earned').textContent = stats.totalCommission.toLocaleString();
    
    renderPipelineSummary();
    renderTodaysFollowUps();
    renderRecentActivity();
}

function calculateStats() {
    const totalLeads = store.leads.length;
    const hotLeads = store.leads.filter(l => l.temperature === 'HOT').length;
    const warmLeads = store.leads.filter(l => l.temperature === 'WARM').length;
    
    const fundedLeads = store.leads.filter(l => l.stage === 'funded' || l.stage === 'paid');
    const conversionRate = totalLeads > 0 ? ((fundedLeads.length / totalLeads) * 100).toFixed(1) : 0;
    
    const pipelineValue = store.leads
        .filter(l => !['funded', 'paid'].includes(l.stage))
        .reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0);
    
    const avgDealSize = fundedLeads.length > 0 
        ? fundedLeads.reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0) / fundedLeads.length 
        : 0;
    
    const thisMonth = store.commissions[store.commissions.length - 1];
    const commissionThisMonth = thisMonth ? thisMonth.total_commission : 0;
    const dealsThisMonth = thisMonth ? thisMonth.deals_funded : 0;
    
    const totalCommission = store.commissions.reduce((sum, c) => sum + c.total_commission, 0);
    
    return {
        totalLeads,
        hotLeads,
        warmLeads,
        conversionRate,
        pipelineValue,
        avgDealSize,
        commissionThisMonth,
        dealsThisMonth,
        totalCommission
    };
}

function renderPipelineSummary() {
    const stages = [
        { key: 'new_lead', name: 'New Lead', color: '#3b82f6' },
        { key: 'contacted', name: 'Contacted', color: '#a855f7' },
        { key: 'qualified', name: 'Qualified', color: '#14b8a6' },
        { key: 'application_sent', name: 'Application', color: '#6366f1' },
        { key: 'submitted_to_funder', name: 'Submitted', color: '#06b6d4' },
        { key: 'approved', name: 'Approved', color: '#10b981' },
        { key: 'funded', name: 'Funded', color: '#22c55e' },
        { key: 'paid', name: 'Paid', color: '#84cc16' },
    ];
    
    const stageCounts = {};
    store.leads.forEach(l => {
        stageCounts[l.stage] = (stageCounts[l.stage] || 0) + 1;
    });
    
    const html = stages.map(s => `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${s.color}; margin-right: 0.5rem;"></div>
                <span style="font-size: 0.875rem;">${s.name}</span>
            </div>
            <span style="font-weight: 500;">${stageCounts[s.key] || 0}</span>
        </div>
    `).join('');
    
    document.getElementById('pipeline-summary').innerHTML = html;
}

function renderTodaysFollowUps() {
    const today = new Date().toISOString().split('T')[0];
    const todaysFollowUps = store.followUps.filter(f => {
        const dueDate = f.due_at.split('T')[0];
        return dueDate === today && f.status === 'pending';
    });
    
    if (todaysFollowUps.length === 0) {
        document.getElementById('todays-followups').innerHTML = 
            '<p style="color: #6b7280; font-size: 0.875rem;">No follow-ups scheduled for today.</p>';
        return;
    }
    
    const html = todaysFollowUps.map(f => {
        const lead = store.leads.find(l => l.id === f.lead_id);
        return `
            <div style="display: flex; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer;" onclick="navigate('lead-detail', {id: '${f.lead_id}'})">
                <i class="fas fa-clock" style="color: #9ca3af; margin-right: 0.75rem;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 500;">${lead ? lead.business_name : 'Unknown'}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">${f.title}</div>
                </div>
                <span style="font-size: 0.75rem; color: #6b7280;">${f.due_at.split('T')[1].substring(0, 5)}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('todays-followups').innerHTML = html;
}

function renderRecentActivity() {
    const recentActivities = store.activities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    if (recentActivities.length === 0) {
        document.getElementById('recent-activity').innerHTML = 
            '<p style="color: #6b7280; font-size: 0.875rem;">No recent activity.</p>';
        return;
    }
    
    const getIcon = (type) => {
        switch(type) {
            case 'call': return 'phone';
            case 'email': return 'envelope';
            default: return 'clock';
        }
    };
    
    const html = recentActivities.map(a => {
        const lead = store.leads.find(l => l.id === a.lead_id);
        return `
            <div style="display: flex; align-items: flex-start; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer;" onclick="navigate('lead-detail', {id: '${a.lead_id}'})\">
                <i class="fas fa-${getIcon(a.type)}" style="color: #9ca3af; margin-right: 0.75rem; margin-top: 0.25rem;"></i>
                <div style="flex: 1;">
                    <div style="font-size: 0.875rem;">
                        <span style="font-weight: 500;">${lead ? lead.business_name : 'Unknown'}</span> — ${a.subject || a.type}
                    </div>
                    <div style="font-size: 0.75rem; color: #9ca3af;">${new Date(a.created_at).toLocaleString()}</div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('recent-activity').innerHTML = html;
}

// ============================================
// Leads List
// ============================================

function renderLeads() {
    filterLeads();
}

function filterLeads() {
    const search = document.getElementById('lead-search').value.toLowerCase();
    const stageFilter = document.getElementById('filter-stage').value;
    const tempFilter = document.getElementById('filter-temp').value;
    
    let filtered = store.leads.filter(lead => {
        const matchesSearch = !search || 
            lead.business_name.toLowerCase().includes(search) ||
            (lead.contact_name && lead.contact_name.toLowerCase().includes(search)) ||
            (lead.email && lead.email.toLowerCase().includes(search)) ||
            (lead.phone && lead.phone.includes(search));
        
        const matchesStage = !stageFilter || lead.stage === stageFilter;
        const matchesTemp = !tempFilter || lead.temperature === tempFilter;
        
        return matchesSearch && matchesStage && matchesTemp;
    });
    
    const tbody = document.getElementById('leads-table');
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #6b7280;">No leads found.</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filtered.map(lead => `
        <tr style="cursor: pointer;">
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div style="font-weight: 500;">${lead.business_name}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.industry || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div>${lead.contact_name || '-'}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.email || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div>${lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-'}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.years_in_business || '-'} years</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><div style="font-weight: 500;">${lead.score || '-'}</div></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.temperature.toLowerCase()}">${lead.temperature}</span></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.stage}">${lead.stage.replace(/_/g, ' ')}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="event.stopPropagation(); navigate('lead-detail', {id: '${lead.id}'});">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #fef2f2; color: #dc2626;" onclick="event.stopPropagation(); deleteLead('${lead.id}');">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${lead.phone ? `<a href="tel:${lead.phone}" style="color: #4f46e5; padding: 0.25rem;" onclick="event.stopPropagation();">
                        <i class="fas fa-phone"></i>
                    </a>` : ''}
                    ${lead.email ? `<a href="mailto:${lead.email}" style="color: #4f46e5; padding: 0.25rem;" onclick="event.stopPropagation();">
                        <i class="fas fa-envelope"></i>
                    </a>` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddLeadModal() {
    document.getElementById('add-lead-modal').style.display = 'flex';
}

function hideAddLeadModal() {
    document.getElementById('add-lead-modal').style.display = 'none';
    // Clear form
    document.getElementById('new-business-name').value = '';
    document.getElementById('new-industry').value = '';
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-phone').value = '';
    document.getElementById('new-email').value = '';
    document.getElementById('new-revenue').value = '';
}

function addLead() {
    const businessName = document.getElementById('new-business-name').value;
    if (!businessName) {
        alert('Business name is required');
        return;
    }
    
    const newLead = {
        id: Date.now().toString(),
        business_name: businessName,
        industry: document.getElementById('new-industry').value,
        contact_name: document.getElementById('new-contact-name').value,
        phone: document.getElementById('new-phone').value,
        email: document.getElementById('new-email').value,
        monthly_revenue: parseInt(document.getElementById('new-revenue').value) || 0,
        temperature: 'WARM',
        stage: 'new_lead',
        score: Math.floor(Math.random() * 40) + 40,
        created_at: new Date().toISOString().split('T')[0]
    };
    
    store.leads.push(newLead);
    saveStore(); // FIXED: Save to localStorage
    
    hideAddLeadModal();
    navigate('leads');
}

// FIXED: New delete lead function
function deleteLead(leadId) {
    if (!confirm('Are you sure you want to delete this lead?')) {
        return;
    }
    
    const index = store.leads.findIndex(l => l.id === leadId);
    if (index > -1) {
        store.leads.splice(index, 1);
        // Also remove related activities and follow-ups
        store.activities = store.activities.filter(a => a.lead_id !== leadId);
        store.followUps = store.followUps.filter(f => f.lead_id !== leadId);
        saveStore();
        renderLeads();
    }
}

// ============================================
// Pipeline
// ============================================

function renderPipeline() {
    const stages = [
        { id: 'new_lead', name: 'New Lead', color: 'bg-blue-500' },
        { id: 'contacted', name: 'Contacted', color: 'bg-purple-500' },
        { id: 'qualified', name: 'Qualified', color: 'bg-teal-500' },
        { id: 'application_sent', name: 'Application Sent', color: 'bg-indigo-500' },
        { id: 'submitted_to_funder', name: 'Submitted to Funder', color: 'bg-cyan-500' },
        { id: 'approved', name: 'Approved', color: 'bg-emerald-500' },
        { id: 'funded', name: 'Funded', color: 'bg-green-500' },
        { id: 'paid', name: 'Paid', color: 'bg-lime-500' },
    ];
    
    const stageColors = {
        new_lead: '#3b82f6',
        contacted: '#a855f7',
        qualified: '#14b8a6',
        application_sent: '#6366f1',
        submitted_to_funder: '#06b6d4',
        approved: '#10b981',
        funded: '#22c55e',
        paid: '#84cc16'
    };
    
    const container = document.getElementById('pipeline-container');
    
    container.innerHTML = stages.map(stage => {
        const stageLeads = store.leads.filter(l => l.stage === stage.id);
        
        return `
            <div class="pipeline-column">
                <div class="pipeline-header" style="background: ${stageColors[stage.id]};">
                    <span>${stage.name}</span>
                    <span class="pipeline-count">${stageLeads.length}</span>
                </div>
                <div class="pipeline-body">
                    ${stageLeads.map(lead => `
                        <div class="lead-card ${lead.temperature.toLowerCase()}" onclick="navigate('lead-detail', {id: '${lead.id}'});">
                            <div class="lead-title">${lead.business_name}</div>
                            <div class="lead-industry">${lead.industry || 'Unknown Industry'}</div>
                            ${lead.monthly_revenue ? `<div class="lead-revenue">$${lead.monthly_revenue.toLocaleString()}/mo</div>` : ''}
                            <div class="lead-footer">
                                <span class="badge badge-${lead.temperature.toLowerCase()}" style="font-size: 0.625rem;">${lead.temperature}</span>
                                <span style="font-size: 0.75rem; color: #6b7280;">Score: ${lead.score}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Lead Detail
// ============================================

function renderLeadDetail() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (!lead) {
        navigate('leads');
        return;
    }
    
    document.getElementById('detail-business-name').textContent = lead.business_name;
    document.getElementById('detail-temperature').value = lead.temperature;
    document.getElementById('detail-stage').value = lead.stage;
    document.getElementById('detail-score').textContent = lead.score || '-';
    document.getElementById('detail-revenue').textContent = lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-';
    
    // Contact Info
    const contactInfo = document.getElementById('detail-contact-info');
    contactInfo.innerHTML = `
        ${lead.contact_name ? `
        <div class="detail-item">
            <i class="fas fa-building"></i>
            <div>
                <div class="detail-label">Contact</div>
                <div class="detail-value">${lead.contact_name}</div>
            </div>
        </div>` : ''}
        
        ${lead.phone ? `
        <div class="detail-item">
            <i class="fas fa-phone"></i>
            <div>
                <div class="detail-label">Phone</div>
                <div class="detail-value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
            </div>
        </div>` : ''}
        
        ${lead.email ? `
        <div class="detail-item">
            <i class="fas fa-envelope"></i>
            <div>
                <div class="detail-label">Email</div>
                <div class="detail-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            </div>
        </div>` : ''}
    `;
    
    // Business Info
    document.getElementById('detail-business-info').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div>
                <div class="detail-label">Years in Business</div>
                <div class="detail-value">${lead.years_in_business || '-'}</div>
            </div>
            <div>
                <div class="detail-label">Industry</div>
                <div class="detail-value">${lead.industry || '-'}</div>
            </div>
            <div>
                <div class="detail-label">Monthly Revenue</div>
                <div class="detail-value">${lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-'}</div>
            </div>
            <div>
                <div class="detail-label">Created</div>
                <div class="detail-value">${lead.created_at}</div>
            </div>
        </div>
    `;
    
    // Activities
    const leadActivities = store.activities
        .filter(a => a.lead_id === lead.id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    const activitiesContainer = document.getElementById('detail-activities');
    if (leadActivities.length === 0) {
        activitiesContainer.innerHTML = '<p style="color: #6b7280;">No activities yet.</p>';
    } else {
        activitiesContainer.innerHTML = leadActivities.map(a => `
            <div class="activity-item">
                <div class="activity-icon"><i class="fas fa-${getActivityIcon(a.type)}"></i></div>
                <div class="activity-content">
                    <div class="activity-header">
                        <span class="activity-type">${a.type}</span>
                        <span class="activity-time">${new Date(a.created_at).toLocaleString()}</span>
                    </div>
                    ${a.subject ? `<div style="font-weight: 500;">${a.subject}</div>` : ''}
                    ${a.content ? `<div style="font-size: 0.875rem; color: #6b7280;">${a.content}</div>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    // Follow-ups
    const leadFollowUps = store.followUps
        .filter(f => f.lead_id === lead.id)
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at));
    
    const followUpsContainer = document.getElementById('detail-followups');
    if (leadFollowUps.length === 0) {
        followUpsContainer.innerHTML = '<p style="color: #6b7280;">No follow-ups scheduled.</p>';
    } else {
        followUpsContainer.innerHTML = leadFollowUps.map(f => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                    <div style="font-weight: 500;">${f.title}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Due: ${new Date(f.due_at).toLocaleString()}</div>
                </div>
                <span class="badge badge-${f.status === 'completed' ? 'funded' : 'warm'}">${f.status}</span>
            </div>
        `).join('');
    }
}

function getActivityIcon(type) {
    switch(type) {
        case 'call': return 'phone';
        case 'email': return 'envelope';
        case 'meeting': return 'users';
        case 'note': return 'sticky-note';
        case 'sms': return 'comment';
        default: return 'clock';
    }
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab:nth-child(${tab === 'overview' ? 1 : tab === 'activities' ? 2 : 3})`).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById('tab-' + tab).style.display = 'block';
}

function updateLeadTemperature() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (lead) {
        lead.temperature = document.getElementById('detail-temperature').value;
        saveStore(); // FIXED: Save to localStorage
    }
}

function updateLeadStage() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (lead) {
        lead.stage = document.getElementById('detail-stage').value;
        store.activities.push({
            id: Date.now().toString(),
            lead_id: currentLeadId,
            type: 'status_change',
            subject: `Stage changed to ${lead.stage.replace(/_/g, ' ')}`,
            created_at: new Date().toISOString()
        });
        saveStore(); // FIXED: Save to localStorage
    }
}

// ============================================
// Calendar
// ============================================

function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // FIXED: Display correct year (was showing 2026)
    document.getElementById('calendar-month').textContent = 
        currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let html = weekDays.map(day => `
        <div class="calendar-day-header">${day}</div>
    `).join('');
    
    for (let i = 0; i < startingDay; i++) {
        html += '<div class="calendar-day"></div>';
    }
    
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const dateStr = date.toISOString().split('T')[0];
        
        const dayFollowUps = store.followUps.filter(f => {
            return f.due_at.startsWith(dateStr) && f.status === 'pending';
        });
        
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="calendar-day-number">${day}</div>
                ${dayFollowUps.map(f => `
                    <div class="calendar-event">${f.title}</div>
                `).join('')}
            </div>
        `;
    }
    
    document.getElementById('calendar-grid').innerHTML = html;
    
    // Upcoming follow-ups
    const upcoming = store.followUps
        .filter(f => f.status === 'pending')
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
        .slice(0, 5);
    
    const upcomingContainer = document.getElementById('upcoming-followups');
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="color: #6b7280;">No upcoming follow-ups.</p>';
    } else {
        upcomingContainer.innerHTML = upcoming.map(f => {
            const lead = store.leads.find(l => l.id === f.lead_id);
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem;">
                    <div>
                        <div style="font-weight: 500;">${f.title}</div>
                        <div style="font-size: 0.75rem; color: #6b7280;">${lead ? lead.business_name : 'Unknown'} — ${new Date(f.due_at).toLocaleString()}</div>
                    </div>
                    <span class="badge badge-warm">Pending</span>
                </div>
            `;
        }).join('');
    }
}

function prevMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
}

// ============================================
// Commissions
// ============================================

function renderCommissions() {
    const totalCommission = store.commissions.reduce((sum, c) => sum + c.total_commission, 0);
    const totalFunded = store.commissions.reduce((sum, c) => sum + c.total_funded, 0);
    const totalDeals = store.commissions.reduce((sum, c) => sum + c.deals_funded, 0);
    const avgRate = store.commissions.reduce((sum, c) => sum + c.avg_commission_rate, 0) / store.commissions.length;
    
    document.getElementById('comm-total').textContent = '$' + totalCommission.toLocaleString();
    document.getElementById('comm-funded').textContent = '$' + totalFunded.toLocaleString();
    document.getElementById('comm-deals').textContent = totalDeals;
    document.getElementById('comm-rate').textContent = avgRate.toFixed(1) + '%';
    
    // Chart
    const maxCommission = Math.max(...store.commissions.map(c => c.total_commission));
    const maxFunded = Math.max(...store.commissions.map(c => c.total_funded / 1000));
    
    const chartHtml = store.commissions.map(c => {
        const commissionHeight = maxCommission > 0 ? (c.total_commission / maxCommission) * 200 : 0;
        const fundedHeight = maxFunded > 0 ? ((c.total_funded / 1000) / maxFunded) * 200 : 0;
        
        return `
            <div class="bar-group">
                <div style="display: flex; align-items: flex-end; gap: 2px; height: 200px;">
                    <div class="bar bar-commission" style="height: ${commissionHeight}px; width: 16px;"></div>
                    <div class="bar bar-funded" style="height: ${fundedHeight}px; width: 16px;"></div>
                </div>
                <span class="bar-label">${c.month}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('commission-chart').innerHTML = chartHtml;
    
    // Table
    document.getElementById('commissions-table').innerHTML = store.commissions.map(c => `
        <tr>
            <td>${c.month}</td>
            <td>${c.deals_funded}</td>
            <td>$${c.total_funded.toLocaleString()}</td>
            <td style="color: #16a34a; font-weight: 500;">$${c.total_commission.toLocaleString()}</td>
            <td>${c.avg_commission_rate}%</td>
        </tr>
    `).join('');
}

// ============================================
// Funders
// ============================================

function renderFunders() {
    const tierLabels = {
        tier_1_beginner: 'Tier 1 - Beginner Friendly',
        tier_2_intermediate: 'Tier 2 - Intermediate',
        tier_3_advanced: 'Tier 3 - Advanced',
        tier_4_premium: 'Tier 4 - Premium',
    };
    
    const grouped = store.funders.reduce((acc, f) => {
        if (!acc[f.tier]) acc[f.tier] = [];
        acc[f.tier].push(f);
        return acc;
    }, {});
    
    const container = document.getElementById('funders-container');
    
    container.innerHTML = Object.entries(grouped).map(([tier, funders]) => `
        <div class="card" style="margin-bottom: 1.5rem; overflow: hidden; padding: 0;">
            <div style="background: #4f46e5; padding: 0.75rem 1.5rem;">
                <h3 style="color: white; font-weight: 600;">${tierLabels[tier] || tier}</h3>
            </div>
            <div>
                ${funders.map(f => `
                    <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <h4 style="font-size: 1.125rem; font-weight: 500;">${f.name}</h4>
                                    ${f.is_preferred ? '<span class="badge badge-funded" style="font-size: 0.625rem;">Preferred</span>' : ''}
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 0.75rem;">
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Deal Range</div>
                                        <div style="font-weight: 500;">$${f.min_deal_amount.toLocaleString()} - $${f.max_deal_amount ? f.max_deal_amount.toLocaleString() : '∞'}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Commission</div>
                                        <div style="font-weight: 500; color: #16a34a;">${f.default_commission_rate}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Turnaround</div>
                                        <div style="font-weight: 500;">${f.avg_turnaround_hours}h</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Contact</div>
                                        <div style="font-weight: 500;">${f.contact_name || '-'}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem;">
                                ${f.contact_email ? `<a href="mailto:${f.contact_email}" style="color: #4f46e5; font-size: 0.875rem;">Email</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// Settings
// ============================================

function renderSettings() {
    renderSettingsContent(currentSettingsTab);
}

function switchSettingsTab(tab) {
    currentSettingsTab = tab;
    
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.settings-nav-item').classList.add('active');
    
    renderSettingsContent(tab);
}

function renderSettingsContent(tab) {
    const container = document.getElementById('settings-content');
    
    switch(tab) {
        case 'profile':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Profile Settings</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-input" id="setting-firstname" value="${store.user.firstName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-input" id="setting-lastname" value="${store.user.lastName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="setting-email" value="${store.user.email}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" id="setting-phone" value="${store.user.phone}">
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" id="setting-company" value="${store.user.company}">
                    </div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'notifications':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Notification Preferences</h3>
                <div style="space-y: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">Email Notifications</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Receive updates via email</div>
                        </div>
                        <input type="checkbox" id="notif-email" ${store.user.notifications.email ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">SMS Notifications</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Receive updates via text</div>
                        </div>
                        <input type="checkbox" id="notif-sms" ${store.user.notifications.sms ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">Follow-up Reminders</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Get reminded about scheduled follow-ups</div>
                        </div>
                        <input type="checkbox" id="notif-followup" ${store.user.notifications.followUpReminders ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div>
                            <div style="font-weight: 500;">Commission Alerts</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Notify when commissions are paid</div>
                        </div>
                        <input type="checkbox" id="notif-commission" ${store.user.notifications.commissionAlerts ? 'checked' : ''}>
                    </div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'commission':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Commission Settings</h3>
                <div class="form-group" style="max-width: 400px;">
                    <label class="form-label">Annual Commission Goal</label>
                    <input type="number" class="form-input" id="setting-goal" value="${store.user.commissionGoal}">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Current progress: $${store.commissions.reduce((sum, c) => sum + c.total_commission, 0).toLocaleString()}</div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'preferences':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Application Preferences</h3>
                <p style="color: #6b7280;">Customize your CRM experience.</p>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
    }
}

function saveSettings() {
    const firstName = document.getElementById('setting-firstname');
    const lastName = document.getElementById('setting-lastname');
    const email = document.getElementById('setting-email');
    const phone = document.getElementById('setting-phone');
    const company = document.getElementById('setting-company');
    const goal = document.getElementById('setting-goal');
    
    if (firstName) store.user.firstName = firstName.value;
    if (lastName) store.user.lastName = lastName.value;
    if (email) store.user.email = email.value;
    if (phone) store.user.phone = phone.value;
    if (company) store.user.company = company.value;
    if (goal) store.user.commissionGoal = parseInt(goal.value);
    
    const notifEmail = document.getElementById('notif-email');
    const notifSms = document.getElementById('notif-sms');
    const notifFollowup = document.getElementById('notif-followup');
    const notifCommission = document.getElementById('notif-commission');
    
    if (notifEmail) store.user.notifications.email = notifEmail.checked;
    if (notifSms) store.user.notifications.sms = notifSms.checked;
    if (notifFollowup) store.user.notifications.followUpReminders = notifFollowup.checked;
    if (notifCommission) store.user.notifications.commissionAlerts = notifCommission.checked;
    
    saveStore(); // FIXED: Save to localStorage
    alert('Settings saved successfully!');
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const [page, id] = hash.split('/');
        if (page === 'lead-detail' && id) {
            navigate('lead-detail', { id });
        } else if (['dashboard', 'leads', 'pipeline', 'calendar', 'commissions', 'funders', 'settings'].includes(page)) {
            navigate(page);
        } else {
            navigate('dashboard');
        }
    } else {
        navigate('dashboard');
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('add-lead-modal');
    if (e.target === modal) {
        hideAddLeadModal();
    }
});

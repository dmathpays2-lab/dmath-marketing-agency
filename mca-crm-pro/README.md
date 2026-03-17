# MCA Pro CRM

**Professional Merchant Cash Advance Pipeline Management System**

A comprehensive, production-ready CRM web application designed specifically for MCA (Merchant Cash Advance) brokers and funding specialists. Built with 30 years of industry expertise.

![MCA Pro CRM](https://img.shields.io/badge/MCA-Pro%20CRM-gold)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Pipeline Management
- **10-Stage Pipeline**: New Lead → Contacted → Qualified → Application Sent → Submitted to Funder → Approved → Funded → Closed Won → Closed Lost → Follow-up
- **Kanban Board View**: Drag-and-drop style pipeline visualization
- **Stage Transitions**: Track deals through the funding process
- **Bulk Actions**: Manage multiple leads simultaneously

### Lead Management
- **Complete Lead Profiles**:
  - Business information (name, industry, location)
  - Contact details (owner, phone, email)
  - Financial data (monthly revenue, time in business)
  - Funding requirements (amount needed, use of funds)
  - Urgency levels (Hot/Warm/Cold)
  - Lead scoring (0-100)

### MCA Expert Fields
Based on 30 years of industry experience:
- Average daily bank balance
- Current merchant processor
- Existing MCA positions
- NSF/Negative days count
- Personal credit score
- Business credit score
- Monthly credit card volume
- Collateral available
- Purpose of funds
- Payback ability analysis

### Activity Tracking
- **Notes**: Free-text notes with timestamps
- **Call Logs**: Date, duration, outcome, notes
- **Emails**: Track sent/received communications
- **Tasks**: Follow-up reminders with due dates
- **Documents**: Store applications, bank statements

### Dashboard & Analytics
- **Key Metrics**: Total leads, commission potential, hot leads, funded deals
- **Pipeline Visualization**: Charts showing leads by stage
- **Industry Breakdown**: See which industries you're working with
- **Today's Follow-ups**: Never miss a scheduled call
- **Overdue Tasks**: Stay on top of pending activities
- **Recent Activity**: Timeline of all actions

### Smart MCA Tools

#### 1. Funding Calculator
Estimate approval amounts based on:
- Monthly revenue
- Years in business
- Average daily bank balance
- Credit score range
- Industry risk level

Calculates:
- Maximum approval amount
- Typical term length
- Factor rate range
- Estimated daily payment

#### 2. Funder Matcher
Intelligently matches leads to the best funders based on:
- Minimum/maximum revenue requirements
- Time in business requirements
- Industry specializations
- Historical performance

#### 3. Commission Estimator
Calculate potential commission on deals

#### 4. Document Checklist
Generates required documents based on:
- Current deal stage
- Selected funder requirements

Standard documents include:
- Completed application
- Last 3 months bank statements
- Driver's license
- Voided business check
- Processing statements
- Proof of insurance
- Business tax returns

#### 5. Objection Handler
Quick responses to common objections:
- "Your rates are too high"
- "I need to think about it"
- "I'm waiting on the bank"
- "That's a lot of documents"
- "Your competitor offered better terms"
- "I don't need funding right now"

#### 6. Email Templates
Professional templates for every stage:
- Cold outreach
- Follow-up emails
- Application requests
- Approval notifications
- Funded celebration

### Search & Filter
- **Global Search**: Find leads by business name, contact, phone
- **Advanced Filters**:
  - Pipeline stage
  - Industry
  - State
  - Urgency level
  - Revenue range
- **Sorting Options**:
  - Date added
  - Revenue (high/low)
  - Lead score
  - Business name

### Data Management
- **Local Storage**: All data persists in browser
- **CSV Export**: Export leads to spreadsheet
- **JSON Import**: Import lead lists
- **50 Real Leads**: Pre-loaded with real business data

## Design

### Professional Dark Theme
- Navy/black background (#0a1628)
- Gold accents (#d4af37) for premium feel
- High contrast for readability
- Subtle gradients and shadows

### Mobile Responsive
- Fully responsive design
- Touch-friendly interface
- Collapsible sidebar
- Optimized for tablets and phones

### User Experience
- Fast loading
- Smooth animations
- Toast notifications
- Keyboard navigation support
- Accessible color contrast

## Installation

### Local Development

1. **Clone or download the repository:**
```bash
git clone https://github.com/yourusername/mca-pro-crm.git
cd mca-pro-crm
```

2. **Open in browser:**
Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. **Access the application:**
Navigate to `http://localhost:8000`

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Usage

### Getting Started

1. **Dashboard**: View your pipeline overview and key metrics
2. **Pipeline**: Manage deals through the kanban board
3. **All Leads**: Full lead database with search and filter
4. **Tasks**: Track follow-ups and to-dos
5. **MCA Tools**: Access calculators and professional tools

### Adding a New Lead

1. Click the "New Lead" button in the top bar
2. Fill in business information
3. Set urgency level (Hot/Warm/Cold)
4. Save the lead

### Managing the Pipeline

1. Click on any lead card to open details
2. Use the stage dropdown to move deals forward
3. Add notes, log calls, and track emails
4. Set follow-up reminders

### Using MCA Tools

1. Click "MCA Tools" in the sidebar
2. Select the tool you need:
   - **Funding Calculator**: Estimate approvals
   - **Funder Matcher**: Find best funders
   - **Email Templates**: Copy professional emails
   - **Objection Handler**: Handle pushback

### Tracking Activities

1. Open a lead's detail view
2. Use the tabs to navigate:
   - Notes: Add free-text notes
   - Call Logs: Record phone conversations
   - Emails: Track communication
   - Tasks: Manage to-dos
   - Documents: Upload files
   - Funder Matches: See recommendations

## Data Storage

All data is stored locally in your browser using `localStorage`. This means:
- ✅ Data persists between sessions
- ✅ Fast access, no server required
- ✅ Complete privacy
- ⚠️ Data is tied to this browser/device
- ⚠️ Clear browser data = lose CRM data

### Backup Your Data

**Regularly export your leads:**
1. Go to "All Leads" view
2. Click "Export CSV"
3. Save the file securely

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Global search |
| `Ctrl/Cmd + N` | New lead |
| `Esc` | Close modal |
| `Tab` | Navigate fields |

## Customization

### Changing User Information

Edit the `AppState.user` object in `app.js`:

```javascript
user: {
    name: 'Your Name',
    role: 'Your Title',
    email: 'your@email.com',
    phone: '(555) 123-4567'
}
```

### Adding New Pipeline Stages

Modify the `PIPELINE_STAGES` array in `app.js`:

```javascript
const PIPELINE_STAGES = [
    { id: 'your_stage', label: 'Your Label', color: '#hexcolor' },
    // ... existing stages
];
```

### Customizing Funders

Edit the `FUNDERS` array in `app.js`:

```javascript
const FUNDERS = [
    {
        id: 1,
        name: 'Your Funder',
        minRevenue: 10000,
        maxRevenue: 500000,
        minTimeInBusiness: 6,
        factorRate: '1.15-1.25',
        maxTerm: 12,
        industries: ['all'],
        specialties: ['your_specialty']
    }
];
```

## API Integration (Future)

The CRM is designed to easily integrate with external APIs:

### Planned Integrations
- **Twilio**: SMS and voice calls
- **SendGrid**: Email sending
- **Google Places**: Business lookup
- **Credit Bureaus**: Credit pulls
- **Funder APIs**: Direct submissions

## Security Considerations

- All data is stored client-side
- No data is transmitted to external servers
- Use HTTPS when deployed
- Regularly export backups
- Clear browser data carefully

## Troubleshooting

### Data Not Saving
- Check browser localStorage is enabled
- Ensure you're not in private/incognito mode
- Check browser storage quota

### Slow Performance
- With 1000+ leads, consider pagination
- Clear old activities periodically
- Export and archive closed deals

### Display Issues
- Clear browser cache
- Check browser zoom level (100% recommended)
- Update to latest browser version

## Roadmap

### Version 1.1 (Planned)
- [ ] User authentication
- [ ] Cloud sync option
- [ ] Mobile app (PWA)
- [ ] Calendar integration
- [ ] Bulk email sending

### Version 1.2 (Planned)
- [ ] Commission tracking
- [ ] Reporting dashboard
- [ ] Team collaboration
- [ ] API integrations
- [ ] Advanced analytics

### Version 2.0 (Planned)
- [ ] Multi-user support
- [ ] Role-based permissions
- [ ] White-label option
- [ ] Native mobile apps
- [ ] AI-powered lead scoring

## Contributing

This is a private project. For feature requests or bug reports, please contact the development team.

## License

MIT License - See LICENSE file for details

## Credits

- **Design**: Professional dark theme with gold accents
- **Icons**: Font Awesome 6
- **Font**: Inter by Google Fonts
- **Built with**: Vanilla JavaScript, HTML5, CSS3

## Support

For support and questions:
- Email: support@mca-pro-crm.com
- Documentation: https://docs.mca-pro-crm.com
- Training: https://training.mca-pro-crm.com

---

**MCA Pro CRM** - Built by MCA professionals, for MCA professionals.

*"The most comprehensive MCA CRM available."*

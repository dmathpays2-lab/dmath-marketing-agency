/**
 * MCA Pro CRM - Complete Application
 * Merchant Cash Advance Pipeline Management System
 * Version: 1.0.0
 */

// ========================================
// INITIALIZATION & CONFIGURATION
// ========================================

// Pipeline Stages Configuration
const PIPELINE_STAGES = [
    { id: 'new_lead', label: 'New Lead', color: '#6b7280' },
    { id: 'contacted', label: 'Contacted', color: '#3b82f6' },
    { id: 'qualified', label: 'Qualified', color: '#8b5cf6' },
    { id: 'application_sent', label: 'Application Sent', color: '#f59e0b' },
    { id: 'submitted_to_funder', label: 'Submitted', color: '#ec4899' },
    { id: 'approved', label: 'Approved', color: '#10b981' },
    { id: 'funded', label: 'Funded', color: '#d4af37' },
    { id: 'closed_won', label: 'Closed Won', color: '#059669' },
    { id: 'closed_lost', label: 'Closed Lost', color: '#dc2626' },
    { id: 'follow_up', label: 'Follow-up', color: '#06b6d4' }
];

// Sample Funders Database
const FUNDERS = [
    { id: 1, name: 'Liberty Funding', minRevenue: 10000, maxRevenue: 500000, minTimeInBusiness: 6, factorRate: '1.15-1.25', maxTerm: 12, industries: ['all'], specialties: ['high_risk', 'restaurant', 'retail'] },
    { id: 2, name: 'Rapid Capital', minRevenue: 15000, maxRevenue: 1000000, minTimeInBusiness: 3, factorRate: '1.12-1.20', maxTerm: 18, industries: ['all'], specialties: ['fast_funding', 'trucking'] },
    { id: 3, name: 'Signature Capital', minRevenue: 20000, maxRevenue: 2000000, minTimeInBusiness: 12, factorRate: '1.10-1.18', maxTerm: 24, industries: ['all'], specialties: ['low_rate', 'established_business'] },
    { id: 4, name: 'Pearl Funding', minRevenue: 8000, maxRevenue: 300000, minTimeInBusiness: 4, factorRate: '1.18-1.30', maxTerm: 10, industries: ['all'], specialties: ['startups', 'construction'] },
    { id: 5, name: 'Meridian Finance', minRevenue: 25000, maxRevenue: 1500000, minTimeInBusiness: 12, factorRate: '1.14-1.22', maxTerm: 15, industries: ['all'], specialties: ['healthcare', 'professional_services'] },
    { id: 6, name: 'Horizon Funding', minRevenue: 12000, maxRevenue: 600000, minTimeInBusiness: 6, factorRate: '1.16-1.28', maxTerm: 14, industries: ['all'], specialties: ['manufacturing', 'distribution'] }
];

// Email Templates
const EMAIL_TEMPLATES = {
    cold: {
        subject: 'Quick question about {{business_name}}',
        body: `Hi {{contact_name}},

I hope this email finds you well. My name is John, and I work with MCA Pro - we specialize in helping businesses like {{business_name}} access working capital quickly and easily.

I noticed your business has been operating for {{years_in_business}} years with strong monthly revenue of ${{monthly_revenue}}. Many businesses in the {{industry}} industry use our funding for:

• Equipment purchases and upgrades
• Inventory and working capital
• Expansion and growth opportunities
• Marketing and advertising campaigns

We offer:
✓ Approvals in 24-48 hours
✓ No collateral required
✓ Flexible credit requirements
✓ Daily or weekly payment options

Would you be open to a brief 5-minute conversation to see if we can help {{business_name}} grow?

Best regards,
John Doe
Senior Funding Advisor
MCA Pro
Phone: (555) 123-4567
Email: john@mca-pro.com`
    },
    followup: {
        subject: 'Following up - Funding for {{business_name}}',
        body: `Hi {{contact_name}},

I wanted to follow up on my previous message about funding options for {{business_name}}.

I understand you're busy running your business, so I'll keep this brief. We currently have:

• Competitive rates starting at 1.10 factor
• Pre-approval that won't affect your credit
• Funding available in as little as 24 hours

Is there a good time this week for a quick 5-minute call to discuss your funding needs?

Alternatively, you can reply with your preferred time and I'll make it work.

Best regards,
John Doe
Senior Funding Advisor
MCA Pro`
    },
    application: {
        subject: 'Your Application - {{business_name}}',
        body: `Hi {{contact_name}},

Thank you for your interest in MCA Pro funding solutions!

Based on our conversation, I'm confident we can help {{business_name}} secure the working capital you need. To move forward, I'll need you to complete the following:

📋 APPLICATION CHECKLIST:

1. Complete the attached application (5 minutes)
2. Provide last 3 months of business bank statements
3. Copy of your driver's license
4. Voided business check for funding

Once I receive these documents, I can:
• Submit to our top funders within 24 hours
• Get you multiple offers to compare
• Have funds in your account within 2-3 business days

Please reply to this email with the completed documents, or if you have any questions.

Best regards,
John Doe
Senior Funding Advisor
MCA Pro
Phone: (555) 123-4567`
    },
    approval: {
        subject: '🎉 Congratulations! {{business_name}} is APPROVED!',
        body: `Hi {{contact_name}},

GREAT NEWS! {{business_name}} has been APPROVED for funding!

📊 APPROVAL DETAILS:
• Approved Amount: ${{funding_amount}}
• Factor Rate: {{factor_rate}}
• Estimated Daily Payment: ${{daily_payment}}
• Term: {{term}} months

NEXT STEPS:
1. Review and sign the funding agreement (attached)
2. Provide any remaining documents
3. Funds will be wired to your account within 24 hours

This approval is valid for 7 days. I'm here to answer any questions and guide you through the final steps.

Congratulations again!

Best regards,
John Doe
Senior Funding Advisor
MCA Pro
Phone: (555) 123-4567`
    },
    funded: {
        subject: '💰 Funds Sent - {{business_name}}',
        body: `Hi {{contact_name}},

Your funding has been sent! 🎉

💰 FUNDING DETAILS:
• Amount Deposited: ${{funding_amount}}
• Account: {{account_ending}}
• Expected Arrival: {{arrival_date}}

REPAYMENT STARTS: {{start_date}}
Daily Amount: ${{daily_payment}}

Your dedicated account manager will be monitoring your account. If you ever need additional funding or have questions, just reply to this email.

Thank you for choosing MCA Pro. We look forward to helping {{business_name}} grow!

Best regards,
John Doe
Senior Funding Advisor
MCA Pro
Phone: (555) 123-4567`
    }
};

// ========================================
// STATE MANAGEMENT
// ========================================

const AppState = {
    leads: [],
    tasks: [],
    activities: [],
    currentView: 'dashboard',
    selectedLead: null,
    filters: {
        stage: 'all',
        industry: 'all',
        state: 'all',
        urgency: 'all',
        search: ''
    },
    user: {
        name: 'John Doe',
        role: 'Senior Broker',
        email: 'john@mca-pro.com',
        phone: '(555) 123-4567'
    }
};

// ========================================
// DATA STORAGE
// ========================================

const Storage = {
    save() {
        localStorage.setItem('mca_crm_leads', JSON.stringify(AppState.leads));
        localStorage.setItem('mca_crm_tasks', JSON.stringify(AppState.tasks));
        localStorage.setItem('mca_crm_activities', JSON.stringify(AppState.activities));
    },

    load() {
        const leads = localStorage.getItem('mca_crm_leads');
        const tasks = localStorage.getItem('mca_crm_tasks');
        const activities = localStorage.getItem('mca_crm_activities');

        if (leads) AppState.leads = JSON.parse(leads);
        if (tasks) AppState.tasks = JSON.parse(tasks);
        if (activities) AppState.activities = JSON.parse(activities);
    },

    exportToCSV() {
        const headers = ['ID', 'Business Name', 'Industry', 'Contact Name', 'Phone', 'Email', 'Monthly Revenue', 'Years in Business', 'State', 'Stage', 'Score', 'Temperature', 'Created At'];
        const rows = AppState.leads.map(lead => [
            lead.id,
            lead.business_name,
            lead.industry,
            lead.contact_name,
            lead.phone,
            lead.email,
            lead.monthly_revenue,
            lead.years_in_business,
            lead.state,
            lead.stage,
            lead.score,
            lead.temperature,
            lead.created_at
        ]);

        const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mca_leads_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Leads exported successfully!', 'success');
    },

    importFromJSON(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (Array.isArray(data)) {
                AppState.leads = [...AppState.leads, ...data];
                Storage.save();
                renderAll();
                showToast(`Imported ${data.length} leads successfully!`, 'success');
                return true;
            }
        } catch (e) {
            showToast('Error importing leads. Invalid format.', 'error');
            return false;
        }
    }
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Load stored data
    Storage.load();

    // Load initial leads if empty
    if (AppState.leads.length === 0) {
        await loadInitialLeads();
    }

    // Initialize UI
    initializeNavigation();
    initializeEventListeners();
    initializeFilters();
    renderAll();

    // Add initial activity
    addActivity('System initialized with ' + AppState.leads.length + ' leads');
});

async function loadInitialLeads() {
    try {
        const response = await fetch('../mca-crm-audit/data/mca_leads_50.json');
        if (response.ok) {
            const leads = await response.json();
            AppState.leads = leads.map(lead => ({
                ...lead,
                notes: [],
                calls: [],
                emails: [],
                tasks: [],
                documents: [],
                expertFields: {
                    dailyBankBalance: null,
                    currentProcessor: null,
                    existingMCAs: null,
                    nsfDays: null,
                    collateral: null,
                    personalCredit: null,
                    businessCredit: null,
                    ccVolume: null,
                    purposeOfFunds: lead.funding_need || null,
                    paybackAnalysis: null
                },
                fundingAmount: lead.monthly_revenue * 0.5 || 25000,
                useOfFunds: lead.funding_need || 'Working Capital',
                urgency: lead.temperature,
                lastContacted: null
            }));
            Storage.save();
        }
    } catch (error) {
        console.log('Using fallback lead data');
        // Fallback data would go here
    }
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            switchView(view);

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
}

function switchView(viewName) {
    AppState.currentView = viewName;

    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    const targetView = document.getElementById(viewName + 'View');
    if (targetView) {
        targetView.classList.add('active');
    }

    // Refresh view-specific content
    if (viewName === 'dashboard') renderDashboard();
    if (viewName === 'pipeline') renderPipeline();
    if (viewName === 'leads') renderLeadsTable();
    if (viewName === 'tasks') renderTasks();
}

// ========================================
// EVENT LISTENERS
// ========================================

function initializeEventListeners() {
    // Add Lead Button
    document.getElementById('addLeadBtn')?.addEventListener('click', () => {
        openModal('newLeadModal');
    });

    // New Lead Form
    document.getElementById('newLeadForm')?.addEventListener('submit', handleNewLeadSubmit);
    document.getElementById('cancelNewLead')?.addEventListener('click', () => {
        closeModal('newLeadModal');
    });
    document.getElementById('closeNewLeadModal')?.addEventListener('click', () => {
        closeModal('newLeadModal');
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Global Search
    document.getElementById('globalSearch')?.addEventListener('input', (e) => {
        AppState.filters.search = e.target.value.toLowerCase();
        if (AppState.currentView === 'leads') {
            renderLeadsTable();
        }
    });

    // Quick Actions Button
    document.getElementById('quickActionBtn')?.addEventListener('click', () => {
        showQuickActionsMenu();
    });

    // Export/Import
    document.getElementById('exportLeadsBtn')?.addEventListener('click', () => {
        Storage.exportToCSV();
    });

    document.getElementById('importLeadsBtn')?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                Storage.importFromJSON(event.target.result);
            };
            reader.readAsText(file);
        };
        input.click();
    });

    // Tool Cards
    document.getElementById('fundingCalculatorTool')?.addEventListener('click', () => {
        openModal('fundingCalculatorModal');
    });

    document.getElementById('funderMatcherTool')?.addEventListener('click', () => {
        openModal('funderMatcherModal');
        populateMatcherLeads();
    });

    document.getElementById('commissionEstimatorTool')?.addEventListener('click', () => {
        openFundingCalculator();
    });

    document.getElementById('documentChecklistTool')?.addEventListener('click', () => {
        openModal('documentChecklistModal');
    });

    document.getElementById('objectionHandlerTool')?.addEventListener('click', () => {
        openModal('objectionHandlerModal');
        initializeObjectionHandler();
    });

    document.getElementById('emailTemplatesTool')?.addEventListener('click', () => {
        openModal('emailTemplatesModal');
        initializeEmailTemplates();
    });

    // Calculator
    document.getElementById('calculateFunding')?.addEventListener('click', calculateFundingEstimate);
    document.getElementById('closeFundingCalculator')?.addEventListener('click', () => {
        closeModal('fundingCalculatorModal');
    });

    // Funder Matcher
    document.getElementById('matcherLeadSelect')?.addEventListener('change', (e) => {
        if (e.target.value) {
            matchFundersForLead(e.target.value);
        }
    });
    document.getElementById('closeFunderMatcher')?.addEventListener('click', () => {
        closeModal('funderMatcherModal');
    });

    // Document Checklist
    document.getElementById('generateChecklist')?.addEventListener('click', generateDocumentChecklist);
    document.getElementById('closeDocumentChecklist')?.addEventListener('click', () => {
        closeModal('documentChecklistModal');
    });

    // Close other modals
    document.getElementById('closeEmailTemplates')?.addEventListener('click', () => {
        closeModal('emailTemplatesModal');
    });
    document.getElementById('closeObjectionHandler')?.addEventListener('click', () => {
        closeModal('objectionHandlerModal');
    });
    document.getElementById('closeLeadModal')?.addEventListener('click', () => {
        closeModal('leadModal');
    });
}

function initializeFilters() {
    // Populate industry filter
    const industries = [...new Set(AppState.leads.map(l => l.industry))].sort();
    const industryFilters = document.querySelectorAll('#pipelineIndustryFilter, #leadsIndustryFilter');
    industryFilters.forEach(filter => {
        industries.forEach(industry => {
            const option = document.createElement('option');
            option.value = industry;
            option.textContent = industry;
            filter.appendChild(option);
        });
    });

    // Populate state filter
    const states = [...new Set(AppState.leads.map(l => l.state))].sort();
    const stateFilter = document.getElementById('pipelineStateFilter');
    if (stateFilter) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateFilter.appendChild(option);
        });
    }

    // Populate stage filter
    const stageFilter = document.getElementById('leadsStageFilter');
    if (stageFilter) {
        PIPELINE_STAGES.forEach(stage => {
            const option = document.createElement('option');
            option.value = stage.id;
            option.textContent = stage.label;
            stageFilter.appendChild(option);
        });
    }

    // Filter change listeners
    document.getElementById('pipelineFilter')?.addEventListener('change', (e) => {
        AppState.filters.urgency = e.target.value;
        renderPipeline();
    });

    document.getElementById('pipelineIndustryFilter')?.addEventListener('change', (e) => {
        AppState.filters.industry = e.target.value;
        renderPipeline();
    });

    document.getElementById('pipelineStateFilter')?.addEventListener('change', (e) => {
        AppState.filters.state = e.target.value;
        renderPipeline();
    });

    document.getElementById('leadsStageFilter')?.addEventListener('change', (e) => {
        AppState.filters.stage = e.target.value;
        renderLeadsTable();
    });

    document.getElementById('leadsIndustryFilter')?.addEventListener('change', (e) => {
        AppState.filters.industry = e.target.value;
        renderLeadsTable();
    });

    document.getElementById('leadsSearch')?.addEventListener('input', (e) => {
        AppState.filters.search = e.target.value.toLowerCase();
        renderLeadsTable();
    });

    document.getElementById('leadsSort')?.addEventListener('change', (e) => {
        renderLeadsTable(e.target.value);
    });
}

// ========================================
// RENDER FUNCTIONS
// ========================================

function renderAll() {
    renderDashboard();
    renderPipeline();
    renderLeadsTable();
    renderTasks();
    updateBadges();
}

function renderDashboard() {
    // Stats
    const totalLeads = AppState.leads.length;
    const hotLeads = AppState.leads.filter(l => l.temperature === 'HOT').length;
    const fundedDeals = AppState.leads.filter(l => l.stage === 'funded' || l.stage === 'closed_won').length;
    const commissionPotential = AppState.leads
        .filter(l => l.stage !== 'closed_lost')
        .reduce((sum, l) => sum + (l.fundingAmount || 0) * 0.1, 0);

    document.getElementById('totalLeads').textContent = totalLeads;
    document.getElementById('hotLeads').textContent = hotLeads;
    document.getElementById('fundedDeals').textContent = fundedDeals;
    document.getElementById('commissionPotential').textContent = formatCurrency(commissionPotential);

    // Pipeline Chart
    renderPipelineChart();

    // Industry Chart
    renderIndustryChart();

    // Today's Follow-ups
    renderTodayFollowups();

    // Overdue Tasks
    renderOverdueTasks();

    // Recent Activity
    renderRecentActivity();

    // Top Funders
    renderTopFunders();
}

function renderPipelineChart() {
    const container = document.getElementById('pipelineChart');
    if (!container) return;

    const counts = {};
    PIPELINE_STAGES.forEach(stage => {
        counts[stage.id] = AppState.leads.filter(l => l.stage === stage.id).length;
    });

    const maxCount = Math.max(...Object.values(counts), 1);

    container.innerHTML = PIPELINE_STAGES.map(stage => {
        const count = counts[stage.id];
        const width = (count / maxCount) * 100;
        return `
            <div class="pipeline-bar">
                <span class="pipeline-bar-label">${stage.label}</span>
                <div class="pipeline-bar-track">
                    <div class="pipeline-bar-fill" style="width: ${width}%; background: ${stage.color}"></div>
                </div>
                <span class="pipeline-bar-value">${count}</span>
            </div>
        `;
    }).join('');
}

function renderIndustryChart() {
    const container = document.getElementById('industryChart');
    if (!container) return;

    const industries = {};
    AppState.leads.forEach(lead => {
        industries[lead.industry] = (industries[lead.industry] || 0) + 1;
    });

    const sorted = Object.entries(industries)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    container.innerHTML = sorted.map(([industry, count]) => `
        <div class="industry-item">
            <span class="industry-name">${industry}</span>
            <span class="industry-count">${count}</span>
        </div>
    `).join('');
}

function renderTodayFollowups() {
    const container = document.getElementById('todayFollowups');
    const countEl = document.getElementById('todayFollowupsCount');
    if (!container) return;

    const today = new Date().toISOString().split('T')[0];
    const followups = AppState.tasks.filter(t => {
        const taskDate = t.dueDate?.split('T')[0];
        return taskDate === today && !t.completed;
    });

    countEl.textContent = followups.length;

    if (followups.length === 0) {
        container.innerHTML = '<p class="empty-state">No follow-ups scheduled for today</p>';
        return;
    }

    container.innerHTML = followups.map(task => `
        <div class="followup-item">
            <div class="followup-icon">
                <i class="fas fa-phone"></i>
            </div>
            <div class="followup-info">
                <div class="followup-title">${task.title}</div>
                <div class="followup-meta">${getLeadName(task.leadId)}</div>
            </div>
            <div class="followup-time">${formatTime(task.dueDate)}</div>
        </div>
    `).join('');
}

function renderOverdueTasks() {
    const container = document.getElementById('overdueTasks');
    const countEl = document.getElementById('overdueTasksCount');
    if (!container) return;

    const now = new Date();
    const overdue = AppState.tasks.filter(t => {
        return new Date(t.dueDate) < now && !t.completed;
    });

    countEl.textContent = overdue.length;

    if (overdue.length === 0) {
        container.innerHTML = '<p class="empty-state">No overdue tasks</p>';
        return;
    }

    container.innerHTML = overdue.map(task => `
        <div class="task-item">
            <div class="task-icon overdue">
                <i class="fas fa-exclamation"></i>
            </div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">${getLeadName(task.leadId)}</div>
            </div>
            <div class="task-time overdue">${formatRelativeTime(task.dueDate)}</div>
        </div>
    `).join('');
}

function renderRecentActivity() {
    const container = document.getElementById('recentActivity');
    if (!container) return;

    const recent = AppState.activities.slice(-5).reverse();

    if (recent.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }

    container.innerHTML = recent.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.icon || 'fa-info'}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${formatRelativeTime(activity.timestamp)}</div>
            </div>
        </div>
    `).join('');
}

function renderTopFunders() {
    const container = document.getElementById('topFunders');
    if (!container) return;

    const funderCounts = {};
    AppState.leads.forEach(lead => {
        if (lead.matchedFunders) {
            lead.matchedFunders.forEach(funderId => {
                funderCounts[funderId] = (funderCounts[funderId] || 0) + 1;
            });
        }
    });

    const sorted = Object.entries(funderCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    if (sorted.length === 0) {
        container.innerHTML = '<p class="empty-state">No funder matches yet</p>';
        return;
    }

    container.innerHTML = sorted.map(([funderId, count]) => {
        const funder = FUNDERS.find(f => f.id == funderId);
        return `
            <div class="funder-item">
                <span class="funder-name">${funder?.name || 'Unknown'}</span>
                <span class="funder-count">${count}</span>
            </div>
        `;
    }).join('');
}

function renderPipeline() {
    const container = document.getElementById('pipelineBoard');
    if (!container) return;

    container.innerHTML = PIPELINE_STAGES.map(stage => {
        let leads = AppState.leads.filter(l => l.stage === stage.id);

        // Apply filters
        if (AppState.filters.urgency !== 'all') {
            leads = leads.filter(l => l.temperature.toLowerCase() === AppState.filters.urgency);
        }
        if (AppState.filters.industry !== 'all') {
            leads = leads.filter(l => l.industry === AppState.filters.industry);
        }
        if (AppState.filters.state !== 'all') {
            leads = leads.filter(l => l.state === AppState.filters.state);
        }

        return `
            <div class="pipeline-column" data-stage="${stage.id}">
                <div class="column-header">
                    <div class="column-title">
                        <span class="column-indicator" style="background: ${stage.color}"></span>
                        ${stage.label}
                    </div>
                    <span class="column-count">${leads.length}</span>
                </div>
                <div class="column-content">
                    ${leads.map(lead => createPipelineCard(lead)).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to cards
    container.querySelectorAll('.pipeline-card').forEach(card => {
        card.addEventListener('click', () => {
            const leadId = card.dataset.leadId;
            openLeadDetail(leadId);
        });
    });
}

function createPipelineCard(lead) {
    const tempClass = lead.temperature?.toLowerCase() || 'warm';
    return `
        <div class="pipeline-card" data-lead-id="${lead.id}">
            <div class="pipeline-card-header">
                <div class="pipeline-card-title">${lead.business_name}</div>
                <span class="pipeline-card-score">${lead.score || 0}</span>
            </div>
            <div class="pipeline-card-meta">
                <span class="pipeline-card-tag ${tempClass}">${lead.temperature}</span>
                <span class="pipeline-card-tag">${lead.industry}</span>
            </div>
            <div class="pipeline-card-footer">
                <span>${lead.state}</span>
                <span class="pipeline-card-value">${formatCurrency(lead.monthly_revenue || 0)}/mo</span>
            </div>
        </div>
    `;
}

function renderLeadsTable(sortBy = 'newest') {
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    let leads = [...AppState.leads];

    // Apply filters
    if (AppState.filters.stage !== 'all') {
        leads = leads.filter(l => l.stage === AppState.filters.stage);
    }
    if (AppState.filters.industry !== 'all') {
        leads = leads.filter(l => l.industry === AppState.filters.industry);
    }
    if (AppState.filters.search) {
        const search = AppState.filters.search;
        leads = leads.filter(l =>
            l.business_name?.toLowerCase().includes(search) ||
            l.contact_name?.toLowerCase().includes(search) ||
            l.phone?.includes(search) ||
            l.email?.toLowerCase().includes(search)
        );
    }

    // Sort
    switch (sortBy) {
        case 'newest':
            leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'revenue':
            leads.sort((a, b) => (b.monthly_revenue || 0) - (a.monthly_revenue || 0));
            break;
        case 'score':
            leads.sort((a, b) => (b.score || 0) - (a.score || 0));
            break;
        case 'name':
            leads.sort((a, b) => a.business_name.localeCompare(b.business_name));
            break;
    }

    tbody.innerHTML = leads.map(lead => `
        <tr data-lead-id="${lead.id}">
            <td><input type="checkbox" class="lead-checkbox"></td>
            <td>
                <div class="lead-cell-business">
                    <span class="business-name">${lead.business_name}</span>
                    <span class="business-industry">${lead.industry}</span>
                </div>
            </td>
            <td>
                <div class="lead-cell-contact">
                    <span class="contact-name">${lead.contact_name}</span>
                    <span class="contact-phone">${lead.phone || 'No phone'}</span>
                </div>
            </td>
            <td>${formatCurrency(lead.monthly_revenue || 0)}</td>
            <td><span class="stage-badge ${lead.stage}">${formatStage(lead.stage)}</span></td>
            <td>
                <span class="score-badge ${getScoreClass(lead.score)}">${lead.score || 0}</span>
            </td>
            <td><span class="temp-badge ${lead.temperature?.toLowerCase()}">${lead.temperature}</span></td>
            <td>${formatRelativeTime(lead.lastContacted) || 'Never'}</td>
            <td>
                <div class="table-actions">
                    <button onclick="openLeadDetail('${lead.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="quickCall('${lead.id}')" title="Call">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button onclick="quickEmail('${lead.id}')" title="Email">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderTasks(filter = 'all') {
    const container = document.getElementById('tasksList');
    if (!container) return;

    let tasks = AppState.tasks;
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    switch (filter) {
        case 'today':
            tasks = tasks.filter(t => t.dueDate?.split('T')[0] === today && !t.completed);
            break;
        case 'upcoming':
            tasks = tasks.filter(t => t.dueDate?.split('T')[0] > today && !t.completed);
            break;
        case 'overdue':
            tasks = tasks.filter(t => new Date(t.dueDate) < now && !t.completed);
            break;
        case 'completed':
            tasks = tasks.filter(t => t.completed);
            break;
    }

    // Update counts
    document.getElementById('allTasksCount').textContent = AppState.tasks.filter(t => !t.completed).length;
    document.getElementById('todayTasksCount').textContent = AppState.tasks.filter(t => t.dueDate?.split('T')[0] === today && !t.completed).length;
    document.getElementById('upcomingTasksCount').textContent = AppState.tasks.filter(t => t.dueDate?.split('T')[0] > today && !t.completed).length;
    document.getElementById('overdueTasksCount2').textContent = AppState.tasks.filter(t => new Date(t.dueDate) < now && !t.completed).length;
    document.getElementById('completedTasksCount').textContent = AppState.tasks.filter(t => t.completed).length;

    if (tasks.length === 0) {
        container.innerHTML = '<p class="empty-state">No tasks found</p>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''} ${new Date(task.dueDate) < now && !task.completed ? 'overdue' : ''}"
             data-task-id="${task.id}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTaskComplete('${task.id}')">
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">${getLeadName(task.leadId)} • ${formatRelativeTime(task.dueDate)}</div>
            </div>
            <button onclick="deleteTask('${task.id}')" class="btn-icon">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateBadges() {
    const today = new Date().toISOString().split('T')[0];
    const taskCount = AppState.tasks.filter(t => t.dueDate?.split('T')[0] === today && !t.completed).length;
    const badge = document.getElementById('taskBadge');
    if (badge) {
        badge.textContent = taskCount;
        badge.style.display = taskCount > 0 ? 'inline-block' : 'none';
    }
}

// ========================================
// LEAD DETAIL MODAL
// ========================================

function openLeadDetail(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (!lead) return;

    AppState.selectedLead = lead;

    // Populate basic info
    document.getElementById('leadBusinessName').textContent = lead.business_name;
    document.getElementById('leadOwnerName').textContent = lead.contact_name || 'Unknown';
    document.getElementById('leadPhone').textContent = lead.phone || '-';
    document.getElementById('leadEmail').textContent = lead.email || '-';
    document.getElementById('leadAddress').textContent = lead.address || '-';
    document.getElementById('leadIndustry').textContent = lead.industry;
    document.getElementById('leadRevenue').textContent = formatCurrency(lead.monthly_revenue || 0);
    document.getElementById('leadYearsInBusiness').textContent = lead.years_in_business + ' years';
    document.getElementById('leadState').textContent = lead.state;
    document.getElementById('leadFundingAmount').textContent = formatCurrency(lead.fundingAmount || 0);
    document.getElementById('leadUseOfFunds').textContent = lead.useOfFunds || '-';
    document.getElementById('leadUrgency').textContent = lead.temperature;
    document.getElementById('leadSource').textContent = lead.source_url || 'Direct';
    document.getElementById('leadScoreBadge').querySelector('.score-value').textContent = lead.score || 0;

    // Tags
    const tagsContainer = document.getElementById('leadTags');
    tagsContainer.innerHTML = `
        <span class="lead-tag industry">${lead.industry}</span>
        <span class="lead-tag state">${lead.state}</span>
        ${lead.minority_owned ? '<span class="lead-tag" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">Minority Owned</span>' : ''}
    `;

    // Expert fields
    const expert = lead.expertFields || {};
    document.getElementById('leadBankBalance').textContent = expert.dailyBankBalance ? formatCurrency(expert.dailyBankBalance) : '-';
    document.getElementById('leadProcessor').textContent = expert.currentProcessor || '-';
    document.getElementById('leadExistingMCAs').textContent = expert.existingMCAs || '-';
    document.getElementById('leadNSF').textContent = expert.nsfDays || '-';
    document.getElementById('leadPersonalCredit').textContent = expert.personalCredit || '-';
    document.getElementById('leadBusinessCredit').textContent = expert.businessCredit || '-';
    document.getElementById('leadCCVolume').textContent = expert.ccVolume ? formatCurrency(expert.ccVolume) : '-';

    // Set current stage
    document.getElementById('leadStageSelect').value = lead.stage;

    // Render tabs content
    renderNotes(lead);
    renderCalls(lead);
    renderEmails(lead);
    renderLeadTasks(lead);
    renderDocuments(lead);
    renderFunderMatches(lead);

    // Setup event listeners for lead detail
    setupLeadDetailListeners(lead);

    openModal('leadModal');
}

function setupLeadDetailListeners(lead) {
    // Quick actions
    document.getElementById('leadCallBtn').onclick = () => quickCall(lead.id);
    document.getElementById('leadEmailBtn').onclick = () => quickEmail(lead.id);
    document.getElementById('leadTextBtn').onclick = () => quickText(lead.id);
    document.getElementById('leadScheduleBtn').onclick = () => scheduleFollowUp(lead.id);

    // Update stage
    document.getElementById('updateStageBtn').onclick = () => {
        const newStage = document.getElementById('leadStageSelect').value;
        updateLeadStage(lead.id, newStage);
    };

    // Set follow-up
    document.getElementById('setFollowUpBtn').onclick = () => {
        const date = document.getElementById('followUpDate').value;
        if (date) {
            addTask({
                leadId: lead.id,
                title: `Follow up with ${lead.business_name}`,
                dueDate: date,
                completed: false
            });
            showToast('Follow-up reminder set!', 'success');
        }
    };

    // Sidebar actions
    document.getElementById('sendApplicationBtn').onclick = () => sendApplicationEmail(lead);
    document.getElementById('matchFunderBtn').onclick = () => {
        const matches = matchFunders(lead);
        showToast(`Found ${matches.length} matching funders!`, 'success');
    };
    document.getElementById('fundingCalcBtn').onclick = () => {
        closeModal('leadModal');
        setTimeout(() => openModal('fundingCalculatorModal'), 300);
    };
    document.getElementById('commissionEstBtn').onclick = () => {
        const commission = (lead.fundingAmount || 25000) * 0.1;
        showToast(`Estimated commission: ${formatCurrency(commission)}`, 'info');
    };

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Panel').classList.add('active');
        };
    });

    // Add note
    document.getElementById('addNoteBtn').onclick = () => {
        const text = document.getElementById('newNoteText').value;
        if (text) {
            addNote(lead.id, text);
            document.getElementById('newNoteText').value = '';
        }
    };

    // Log call
    document.getElementById('logCallBtn').onclick = () => logCall(lead.id);

    // Send email
    document.getElementById('sendEmailBtn').onclick = () => sendEmailToLead(lead.id);

    // Add task
    document.getElementById('addLeadTaskBtn').onclick = () => addTaskForLead(lead.id);

    // Upload doc
    document.getElementById('uploadDocBtn').onclick = () => uploadDocument(lead.id);
}

function renderNotes(lead) {
    const container = document.getElementById('notesList');
    const notes = lead.notes || [];

    if (notes.length === 0) {
        container.innerHTML = '<p class="empty-state">No notes yet</p>';
        return;
    }

    container.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-author">${note.author || 'System'}</span>
                <span class="note-time">${formatRelativeTime(note.timestamp)}</span>
            </div>
            <div class="note-text">${note.text}</div>
        </div>
    `).join('');
}

function renderCalls(lead) {
    const container = document.getElementById('callsList');
    const calls = lead.calls || [];

    if (calls.length === 0) {
        container.innerHTML = '<p class="empty-state">No calls logged yet</p>';
        return;
    }

    container.innerHTML = calls.map(call => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-author">Call: ${call.outcome || 'Completed'}</span>
                <span class="note-time">${formatRelativeTime(call.timestamp)}</span>
            </div>
            <div class="note-text">
                Duration: ${call.duration || 'N/A'}<br>
                ${call.notes || ''}
            </div>
        </div>
    `).join('');
}

function renderEmails(lead) {
    const container = document.getElementById('emailsList');
    const emails = lead.emails || [];

    if (emails.length === 0) {
        container.innerHTML = '<p class="empty-state">No emails yet</p>';
        return;
    }

    container.innerHTML = emails.map(email => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-author">${email.subject}</span>
                <span class="note-time">${formatRelativeTime(email.timestamp)}</span>
            </div>
            <div class="note-text">${email.preview || 'Email sent'}</div>
        </div>
    `).join('');
}

function renderLeadTasks(lead) {
    const container = document.getElementById('leadTasksList');
    const tasks = AppState.tasks.filter(t => t.leadId == lead.id);

    if (tasks.length === 0) {
        container.innerHTML = '<p class="empty-state">No tasks for this lead</p>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-author">${task.title}</span>
                <span class="note-time">${formatRelativeTime(task.dueDate)}</span>
            </div>
            <div class="note-text">${task.completed ? '✓ Completed' : 'Pending'}</div>
        </div>
    `).join('');
}

function renderDocuments(lead) {
    const container = document.getElementById('documentsList');
    const docs = lead.documents || [];

    if (docs.length === 0) {
        container.innerHTML = '<p class="empty-state">No documents uploaded</p>';
        return;
    }

    container.innerHTML = docs.map(doc => `
        <div class="note-item">
            <div class="note-header">
                <span class="note-author"><i class="fas fa-file"></i> ${doc.name}</span>
                <span class="note-time">${formatRelativeTime(doc.timestamp)}</span>
            </div>
            <div class="note-text">${doc.type || 'Document'}</div>
        </div>
    `).join('');
}

function renderFunderMatches(lead) {
    const container = document.getElementById('funderMatches');
    const matches = matchFunders(lead);

    if (matches.length === 0) {
        container.innerHTML = '<p class="empty-state">No funders matched. Check revenue and time in business requirements.</p>';
        return;
    }

    container.innerHTML = matches.map(funder => `
        <div class="funder-item" style="margin-bottom: 10px;">
            <div>
                <div class="funder-name">${funder.name}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">
                    Factor Rate: ${funder.factorRate} | Max Term: ${funder.maxTerm} months
                </div>
            </div>
            <button class="btn btn-sm btn-primary" onclick="submitToFunder('${lead.id}', ${funder.id})">
                Submit
            </button>
        </div>
    `).join('');
}

// ========================================
// MCA TOOLS
// ========================================

function calculateFundingEstimate() {
    const revenue = parseFloat(document.getElementById('calcRevenue').value) || 0;
    const years = parseFloat(document.getElementById('calcYears').value) || 0;
    const balance = parseFloat(document.getElementById('calcBankBalance').value) || 0;
    const credit = document.getElementById('calcCreditScore').value;
    const industry = document.getElementById('calcIndustry').value;

    if (!revenue) {
        showToast('Please enter monthly revenue', 'warning');
        return;
    }

    // Calculate max approval (typically 1-2x monthly revenue)
    let multiplier = 1.0;
    if (years >= 5) multiplier += 0.3;
    if (years >= 3) multiplier += 0.2;
    if (credit === 'excellent') multiplier += 0.3;
    if (credit === 'good') multiplier += 0.2;
    if (balance > revenue * 0.2) multiplier += 0.2;
    if (industry === 'low') multiplier += 0.1;
    if (industry === 'high') multiplier -= 0.2;

    const maxApproval = Math.round(revenue * multiplier);

    // Calculate factor rate
    let factorRateMin = 1.15;
    let factorRateMax = 1.35;
    if (credit === 'excellent') { factorRateMin = 1.10; factorRateMax = 1.20; }
    if (credit === 'good') { factorRateMin = 1.15; factorRateMax = 1.25; }
    if (credit === 'fair') { factorRateMin = 1.20; factorRateMax = 1.30; }
    if (credit === 'poor') { factorRateMin = 1.25; factorRateMax = 1.40; }
    if (credit === 'bad') { factorRateMin = 1.30; factorRateMax = 1.50; }

    // Calculate term
    const term = years >= 5 ? '6-18' : years >= 2 ? '4-12' : '3-8';

    // Calculate daily payment (assuming 21 business days/month)
    const avgTerm = parseInt(term.split('-')[0]) + 2;
    const dailyPayment = Math.round((maxApproval * factorRateMin) / (avgTerm * 21));

    // Display results
    document.getElementById('maxApproval').textContent = formatCurrency(maxApproval);
    document.getElementById('typicalTerm').textContent = term + ' months';
    document.getElementById('factorRate').textContent = factorRateMin.toFixed(2) + '-' + factorRateMax.toFixed(2);
    document.getElementById('dailyPayment').textContent = formatCurrency(dailyPayment);

    document.getElementById('calculatorResults').style.display = 'block';
}

function matchFunders(lead) {
    const revenue = lead.monthly_revenue || 0;
    const months = (lead.years_in_business || 0) * 12;

    const matches = FUNDERS.filter(funder => {
        return revenue >= funder.minRevenue &&
               revenue <= funder.maxRevenue &&
               months >= funder.minTimeInBusiness;
    });

    // Store matches on lead
    lead.matchedFunders = matches.map(f => f.id);
    Storage.save();

    return matches;
}

function populateMatcherLeads() {
    const select = document.getElementById('matcherLeadSelect');
    select.innerHTML = '<option value="">Select a lead...</option>' +
        AppState.leads.map(lead => `
            <option value="${lead.id}">${lead.business_name} - ${lead.industry}</option>
        `).join('');
}

function matchFundersForLead(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (!lead) return;

    const matches = matchFunders(lead);
    const container = document.getElementById('matcherResults');

    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4>Matching funders for ${lead.business_name}</h4>
            <p style="color: var(--color-text-muted);">
                Revenue: ${formatCurrency(lead.monthly_revenue || 0)}/mo | 
                Time: ${lead.years_in_business} years
            </p>
        </div>
        <div class="funder-matches">
            ${matches.map(funder => `
                <div class="funder-item" style="padding: 15px; margin-bottom: 10px;">
                    <div>
                        <div style="font-weight: 600; color: var(--color-gold);">${funder.name}</div>
                        <div style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 5px;">
                            Factor: ${funder.factorRate} | Max: ${formatCurrency(funder.maxRevenue)} | 
                            Term: ${funder.maxTerm} months
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="showToast('Submitted to ${funder.name}!', 'success')">
                        Submit
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function generateDocumentChecklist() {
    const stage = document.getElementById('checklistStage').value;
    const funder = document.getElementById('checklistFunder').value;
    const container = document.getElementById('checklistResults');

    const baseDocs = [
        'Completed Application',
        'Last 3 Months Business Bank Statements',
        'Driver\'s License',
        'Voided Business Check'
    ];

    const stageDocs = {
        new_lead: [],
        qualified: ['Business Verification'],
        application_sent: baseDocs,
        submitted_to_funder: [...baseDocs, 'Merchant Processing Statements (last 3 months)']
    };

    const funderDocs = {
        liberty: ['Proof of Business Insurance'],
        rapid: [],
        signature: ['Business Tax Returns (last year)'],
        pearl: []
    };

    const docs = [...(stageDocs[stage] || baseDocs), ...(funderDocs[funder] || [])];

    container.innerHTML = `
        <h4 style="margin-bottom: 15px; color: var(--color-gold);">Required Documents</h4>
        <ul style="list-style: none; padding: 0;">
            ${docs.map(doc => `
                <li style="padding: 10px; background: var(--color-primary-lighter); margin-bottom: 8px; border-radius: 6px;">
                    <i class="fas fa-check-square" style="color: var(--color-gold); margin-right: 10px;"></i>
                    ${doc}
                </li>
            `).join('')}
        </ul>
    `;
    container.style.display = 'block';
}

function initializeObjectionHandler() {
    document.querySelectorAll('.objection-item h4').forEach(header => {
        header.onclick = () => {
            const response = header.nextElementSibling;
            response.style.display = response.style.display === 'none' ? 'block' : 'none';
        };
    });
}

function initializeEmailTemplates() {
    document.querySelectorAll('.template-card').forEach(card => {
        card.querySelector('.view-template').onclick = () => {
            const templateKey = card.dataset.template;
            const template = EMAIL_TEMPLATES[templateKey];

            document.getElementById('templatePreviewTitle').textContent = card.querySelector('h4').textContent;
            document.getElementById('templateContent').value = `Subject: ${template.subject}\n\n${template.body}`;
            document.getElementById('templatePreview').style.display = 'block';
        };
    });

    document.getElementById('copyTemplate').onclick = () => {
        const content = document.getElementById('templateContent');
        content.select();
        document.execCommand('copy');
        showToast('Template copied to clipboard!', 'success');
    };

    document.getElementById('useTemplate').onclick = () => {
        if (AppState.selectedLead) {
            closeModal('emailTemplatesModal');
            quickEmail(AppState.selectedLead.id);
        } else {
            showToast('Please open a lead first to use this template', 'warning');
        }
    };
}

// ========================================
// ACTIONS & HELPERS
// ========================================

function handleNewLeadSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newLead = {
        id: Date.now().toString(),
        business_name: formData.get('business_name'),
        contact_name: formData.get('contact_name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        industry: formData.get('industry'),
        state: formData.get('state'),
        monthly_revenue: parseFloat(formData.get('monthly_revenue')) || 0,
        years_in_business: parseFloat(formData.get('years_in_business')) || 0,
        temperature: formData.get('temperature') || 'WARM',
        stage: 'new_lead',
        score: calculateLeadScore({
            monthly_revenue: parseFloat(formData.get('monthly_revenue')) || 0,
            years_in_business: parseFloat(formData.get('years_in_business')) || 0
        }),
        created_at: new Date().toISOString().split('T')[0],
        notes: [],
        calls: [],
        emails: [],
        tasks: [],
        documents: [],
        expertFields: {
            dailyBankBalance: null,
            currentProcessor: null,
            existingMCAs: null,
            nsfDays: null,
            collateral: null,
            personalCredit: null,
            businessCredit: null,
            ccVolume: null,
            purposeOfFunds: null,
            paybackAnalysis: null
        },
        fundingAmount: (parseFloat(formData.get('monthly_revenue')) || 0) * 0.5,
        useOfFunds: 'Working Capital',
        urgency: formData.get('temperature') || 'WARM'
    };

    AppState.leads.push(newLead);
    Storage.save();
    addActivity(`Added new lead: ${newLead.business_name}`, 'fa-user-plus');

    closeModal('newLeadModal');
    e.target.reset();
    renderAll();
    showToast('New lead added successfully!', 'success');
}

function calculateLeadScore(lead) {
    let score = 50;
    if (lead.monthly_revenue > 50000) score += 20;
    else if (lead.monthly_revenue > 30000) score += 10;
    if (lead.years_in_business >= 5) score += 20;
    else if (lead.years_in_business >= 2) score += 10;
    return Math.min(score, 100);
}

function updateLeadStage(leadId, newStage) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead) {
        const oldStage = lead.stage;
        lead.stage = newStage;
        Storage.save();
        addActivity(`Moved ${lead.business_name} from ${formatStage(oldStage)} to ${formatStage(newStage)}`, 'fa-exchange-alt');
        renderAll();
        showToast(`Stage updated to ${formatStage(newStage)}`, 'success');
    }
}

function addNote(leadId, text) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead) {
        if (!lead.notes) lead.notes = [];
        lead.notes.push({
            text,
            author: AppState.user.name,
            timestamp: new Date().toISOString()
        });
        Storage.save();
        renderNotes(lead);
        addActivity(`Added note to ${lead.business_name}`, 'fa-sticky-note');
        showToast('Note added!', 'success');
    }
}

function logCall(leadId) {
    const duration = prompt('Call duration (e.g., "5 minutes"):');
    if (duration) {
        const lead = AppState.leads.find(l => l.id == leadId);
        if (lead) {
            if (!lead.calls) lead.calls = [];
            lead.calls.push({
                duration,
                outcome: 'Completed',
                notes: 'Call logged via CRM',
                timestamp: new Date().toISOString()
            });
            lead.lastContacted = new Date().toISOString();
            Storage.save();
            renderCalls(lead);
            addActivity(`Logged call with ${lead.business_name}`, 'fa-phone');
            showToast('Call logged!', 'success');
        }
    }
}

function addTask(taskData) {
    const task = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString()
    };
    AppState.tasks.push(task);
    Storage.save();
    updateBadges();
}

function addTaskForLead(leadId) {
    const title = prompt('Task description:');
    if (title) {
        const dueDate = prompt('Due date (YYYY-MM-DD HH:MM):') || new Date().toISOString();
        addTask({
            leadId,
            title,
            dueDate,
            completed: false
        });
        const lead = AppState.leads.find(l => l.id == leadId);
        renderLeadTasks(lead);
        showToast('Task added!', 'success');
    }
}

function toggleTaskComplete(taskId) {
    const task = AppState.tasks.find(t => t.id == taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            task.completedAt = new Date().toISOString();
        }
        Storage.save();
        renderTasks();
        updateBadges();
    }
}

function deleteTask(taskId) {
    if (confirm('Delete this task?')) {
        AppState.tasks = AppState.tasks.filter(t => t.id != taskId);
        Storage.save();
        renderTasks();
        updateBadges();
        showToast('Task deleted', 'info');
    }
}

function submitToFunder(leadId, funderId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    const funder = FUNDERS.find(f => f.id == funderId);
    if (lead && funder) {
        updateLeadStage(leadId, 'submitted_to_funder');
        showToast(`Submitted ${lead.business_name} to ${funder.name}!`, 'success');
    }
}

// ========================================
// QUICK ACTIONS
// ========================================

function quickCall(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead && lead.phone) {
        window.open(`tel:${lead.phone}`);
        logCall(leadId);
    } else {
        showToast('No phone number available', 'warning');
    }
}

function quickEmail(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead && lead.email) {
        window.open(`mailto:${lead.email}`);
        addActivity(`Sent email to ${lead.business_name}`, 'fa-envelope');
    } else {
        showToast('No email address available', 'warning');
    }
}

function quickText(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead && lead.phone) {
        const message = encodeURIComponent(`Hi ${lead.contact_name}, this is ${AppState.user.name} from MCA Pro. I wanted to follow up on funding options for ${lead.business_name}. When would be a good time to chat?`);
        window.open(`sms:${lead.phone}?body=${message}`);
        addActivity(`Sent text to ${lead.business_name}`, 'fa-comment');
    } else {
        showToast('No phone number available', 'warning');
    }
}

function scheduleFollowUp(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    if (lead) {
        const date = prompt('Enter follow-up date (YYYY-MM-DD HH:MM):');
        if (date) {
            addTask({
                leadId,
                title: `Follow up with ${lead.contact_name} at ${lead.business_name}`,
                dueDate: date,
                completed: false
            });
            showToast('Follow-up scheduled!', 'success');
        }
    }
}

function sendApplicationEmail(lead) {
    const template = EMAIL_TEMPLATES.application;
    const body = template.body
        .replace(/\{\{contact_name\}\}/g, lead.contact_name || 'there')
        .replace(/\{\{business_name\}\}/g, lead.business_name);

    const subject = encodeURIComponent(template.subject.replace('{{business_name}}', lead.business_name));
    const encodedBody = encodeURIComponent(body);

    if (lead.email) {
        window.open(`mailto:${lead.email}?subject=${subject}&body=${encodedBody}`);
        addActivity(`Sent application request to ${lead.business_name}`, 'fa-file-alt');
        showToast('Application email prepared!', 'success');
    } else {
        showToast('No email address available', 'warning');
    }
}

function sendEmailToLead(leadId) {
    quickEmail(leadId);
}

function uploadDocument(leadId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const lead = AppState.leads.find(l => l.id == leadId);
            if (lead) {
                if (!lead.documents) lead.documents = [];
                lead.documents.push({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    timestamp: new Date().toISOString()
                });
                Storage.save();
                renderDocuments(lead);
                addActivity(`Uploaded document to ${lead.business_name}`, 'fa-file-upload');
                showToast('Document uploaded!', 'success');
            }
        }
    };
    input.click();
}

function showQuickActionsMenu() {
    // Create a simple dropdown menu
    const actions = [
        { label: 'Add New Lead', icon: 'fa-user-plus', action: () => openModal('newLeadModal') },
        { label: 'Funding Calculator', icon: 'fa-calculator', action: () => openModal('fundingCalculatorModal') },
        { label: 'Funder Matcher', icon: 'fa-handshake', action: () => openModal('funderMatcherModal') },
        { label: 'Email Templates', icon: 'fa-envelope', action: () => openModal('emailTemplatesModal') },
        { label: 'Export Leads', icon: 'fa-download', action: () => Storage.exportToCSV() }
    ];

    // Simple implementation - just open the new lead modal for now
    openModal('newLeadModal');
}

// ========================================
// UTILITIES
// ========================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function addActivity(text, icon = 'fa-circle') {
    AppState.activities.push({
        text,
        icon,
        timestamp: new Date().toISOString()
    });
    // Keep only last 50 activities
    if (AppState.activities.length > 50) {
        AppState.activities = AppState.activities.slice(-50);
    }
    Storage.save();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatStage(stageId) {
    const stage = PIPELINE_STAGES.find(s => s.id === stageId);
    return stage ? stage.label : stageId;
}

function formatTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatRelativeTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 30) return date.toLocaleDateString();
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

function getLeadName(leadId) {
    const lead = AppState.leads.find(l => l.id == leadId);
    return lead ? lead.business_name : 'Unknown';
}

function getScoreClass(score) {
    if (!score) return 'score-low';
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
}

// ========================================
// TASK FILTER LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.task-filter').forEach(filter => {
        filter.addEventListener('click', () => {
            document.querySelectorAll('.task-filter').forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            renderTasks(filter.dataset.filter);
        });
    });
});

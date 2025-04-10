# TruTrip QA Automation Framework

This project provides a robust test automation framework using Playwright (for web UI testing) and SuperTest (for API testing), applying best practices like Page Object Model (POM), environment configuration, reusable locators and actions, and clear test reporting.

---

## 📁 Project Structure

```
├── api/                       # SuperTest API client modules
│   └── login.api.ts
├── pages/                    # Page-level actions (can include auth, login, etc.)
│   └── locators/                 # Locator definitions (per page/module)
│      └── book-flight.locator.ts
│   └── actions/                  # UI interaction logic (POM actions)
│       └── book-flight.action.ts
├── schemas/                  # Zod schemas for API response validation
├── test-data/                # Static test data (JSON)
│   └── user-data.json
├── tests/
│   ├── web/                  # UI tests
│   └── api/                  # API tests
├── .env                      # Environment variables (baseUrl, credentials, etc.)
├── reports/                  # HTML reports
├── playwright.config.ts      # Global Playwright config
├── jest.config.js            # Jest config for API tests
├── tsconfig.json             # configuration related typescript framework    
└── README.md
```

---

## ✅ Features

- ✅ Web automation using [Playwright](https://playwright.dev/)
- ✅ API automation using [SuperTest](https://github.com/visionmedia/supertest)
- ✅ Page Object Model (POM) structure
- ✅ Zod schema validation for API responses
- ✅ Configurable via `.env`
- ✅ HTML reports for both UI and API tests
- ✅ Screenshot and video capture for failed UI tests
- ✅ Dynamic test data loading from `.env` and JSON

---

## 🔧 How to Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Install browser binaries for Playwright
```bash
npx playwright install
```
*(Note: This step is auto-invoked via postinstall script too)*

### 3. Configure environment variables
Edit `config/.env`:
```env
# Web
BASE_URL=https://demo.trutrip.co
USER_EMAIL=you@example.com
USER_PASSWORD=yourpassword
BASIC_AUTH_USER=yourbasicuser
BASIC_AUTH_PASS=yourbasicpass
HEADLESS=true

# API
API_BASE_URL=https://apidemo.trutrip.co
X_API_KEY=your-api-key

# Others
ORIGIN_CITY=bandung
DESTINATION_CITY=bali
DEFAULT_TIMEOUT=10000
```

---

## 🚀 How to Run

### ▶️ Run Web (Playwright) tests
```bash
npm run test:web
```

### ▶️ Run API (SuperTest + Jest) tests
```bash
npm run test:api
```

### ▶️ Open latest HTML report
```bash
npm run report:web    # opens Playwright HTML report
npm run report:api    # opens API HTML report
```

---

## ⚙️ Custom Execution

### Run in non-headless mode (UI visible)
```bash
HEADLESS=false npm run test:web
```

### Run a single test file
```bash
npx playwright test tests/web/flight-search.test.ts
```

---

## 📸 Reports & Debugging
- Failed UI tests → screenshots + video recording
- All tests → HTML report in `/reports`

---

## 📦 NPM Scripts

```json
"scripts": {
  "test:web": "npx playwright test",
  "test:api": "jest --config=jest.config.js",
  "report:web": "npx playwright show-report",
  "report:api": "open reports/api-report.html",
  "lint": "eslint . --ext .ts"
}
```

---

## 🔐 Authentication Handling
- HTTP Basic Auth via `httpCredentials` (auto set from `.env`)
- UI login flow handled via `LoginAction`

---

## 🧪 Tech Stack
- Playwright (TypeScript)
- SuperTest + Jest (API)
- Zod (API schema validation)
- dotenv (environment management)
- HTML reporting

---

## 🧹 Tips
- Extend `playwright.config.ts` to customize timeouts, retries, etc.
- Store all dynamic values in `.env` or `test-data/`

---

Happy testing! 🚀
# CMD_STORE
Ntpc store work 


backend/
├── .env
├── package.json
├── server.js
├── db.js
├── models/
│   ├── User.js
│   └── PurchaseOrder.js
├── controllers/
│   ├── authController.js
│   ├── purchaseOrderController.js
│   ├── statsController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── purchaseOrderRoutes.js
│   ├── statsRoutes.js
│   └── adminRoutes.js
├── middleware/
│   └── auth.js
└── uploads/



## FRONTEND
src/
├── api/
│   ├── axiosClient.js       # Central Axios config with JWT interceptors
│   ├── authApi.js           # Login API
│   ├── poApi.js             # Purchase Order & Stats API
├── components/
│   ├── ProtectedRoute.jsx   # Route guard
│   ├── PieChart.jsx         # Reusable Chart component
│   ├── Sidebar.jsx          # Navigation Sidebar
├── context/
│   └── AuthContext.jsx      # Auth state management
├── pages/
│   ├── Login.jsx            # Login page
│   └── Dashboard.jsx        # Main dashboard (Charts + Table)
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── index.css                # Tailwind directives
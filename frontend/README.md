# Rentkar Frontend


1. Copy files into a new Next.js 14 TypeScript app (app/ router). Install dependencies from package.json.


2. Create `.env.local` from `.env.local.example` and set `NEXT_PUBLIC_API_BASE` to your backend URL (e.g. http://localhost:4000/api).


3. Run:
```
npm install
npm run dev
```


4. Demo credentials (seed backend):
- Admin: admin@rentkar.com / Admin123!
- Partner: partner1@rentkar.com / Partner123!


Notes:
- Map uses react-leaflet (no API key). If markers do not show, ensure leaflet CSS is loaded (imported in MapView).
- Protected routes call `/auth/me` on backend. Implement `GET /api/auth/me` in backend if not yet created.


----


End of project file bundle.
import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { History } from '../pages/History'
import { DefaultLayout } from '../layouts/DefaultLayout'

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<History />} />
            </Route>
        </Routes>
    )
}
//Layout
import { HeaderOnly } from '~/components/Layouts';

//pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/search', component: Search },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRouter = [];

export { publicRoutes, privateRouter };

import Navbar from '../../components/navbar/Navbar'
import ProductSearch from '@/components/productsearch/ProductSearch'
import Footer from '@/components/footer/Footer'
import LoginForm from '../(pages)/login/LoginForm/LoginForm'
import RegisterForm from '../(pages)/register/RegisterForm/RegisterForm'
import {FooterSection} from '../../lib/types'
import ProfileInfo from '../(pages)/profile/ProfileInfo/ProfileInfo'
import FavoriteProducts from '@/components/favoriteproducts/FavoriteProducts'
import Card from '../(pages)/shoppingcard/ShoppinCard/Card'
import HeroSlogan from '@/components/heropageslogan/HeroSlogan'
import Products from '../(pages)/products/Products/Products'
import AdminCrud from '../(pages)/adminpanel/AdminCrud/AdminCrud'
import AddProduct from '@/components/modals/AddProduct/AddProduct'
import DeleteProduct from '@/components/modals/DeleteProduct/DeleteProduct'
import ElectronicProductLoader from '@/components/skeletons/electronicProductsSkeleton/ElectronicProductLoader'

const footerLinks: FooterSection[] = [
    {
        title: 'flemman.',
        links: [
            { name: 'Documentation', logo: '' },
            { name: 'FAQ', logo: '' },
            { name: 'Application', logo: '' },
            { name: 'Get in Touch', logo: '' }
        ]
    },
    {
        title: 'How to Reach Us?',
        links: [
            { name: 'flemman@email.com', logo: '/icons/mail-icon.svg' },
            { name: '+1 508-203-9070', logo: '/icons/phone-icon.svg' }
        ]
    },
    {
        title: 'Social Media',
        links: [
            { logo: '/icons/instagram.svg' },
            { logo: '/icons/facebook.svg' },
            { logo: '/icons/twitter.svg' },
            { logo: '/icons/tv.svg' }
        ]
    }
];
export {
    Navbar,
    ProductSearch,
    footerLinks,
    Footer,
    LoginForm,
    RegisterForm,
    ProfileInfo,
    FavoriteProducts,
    Card,
    HeroSlogan,
    Products,
    AdminCrud,
    AddProduct,
    DeleteProduct,
    ElectronicProductLoader
}
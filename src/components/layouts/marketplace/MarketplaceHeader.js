import {
    Stack,
    Typography,
    IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import OutlinedButton from '../../buttons/OutlinedButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import * as ROUTES from '../../../constants/routes';
import './MarketplaceHeader.scss';

function MarketplaceHeader({ currentUser }) {

    const navigate = useNavigate();

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={8} className="marketplace__header__container">
            {/* logo container */}
            <Stack direction="row" alignItems="center" justifyContent="start" gap={4}>
                {/* hamburger */}
                <IconButton disabbleRipple size="medium" className="icon" onClick={""}>
                    <GiHamburgerMenu />
                </IconButton>
                {/* logo */}
                <Stack direction="column" alignItems="start" justifyContent="center">
                    <Typography>SMK Korporasi Garut</Typography>
                    <Typography fontWeight="bold">Marketplace</Typography>
                </Stack>
            </Stack>
            {/* search-bar container */}

            {/* nav container */}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={2}>
                <IconButton disableRipple size="medium" onClick={""} className="icon">
                    <FaShoppingCart />
                </IconButton>
                <div className="divider">d</div>
                <PrimaryButton variant="standard" onClick={() => navigate(ROUTES.LOGIN)}>Login</PrimaryButton>
                <OutlinedButton variant="standard" onclick={() => navigate(ROUTES.REGISTER)}>Daftar</OutlinedButton>
            </Stack>
        </Stack>
    )
}

export default MarketplaceHeader;
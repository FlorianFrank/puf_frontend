import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import UPLogo from '../../assets/up_logo.png'

import {MdOutlineCancel} from 'react-icons/md';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';

import '../../css/sidebar.css'

import {links} from '../../data/navbar_config';

import {useStateContext} from '../../contexts/ContextProvider';

const useStyles = makeStyles((theme) => ({
    badge: {
        width: 20,
        height: 20,
        backgroundColor: theme.palette.success.main,
        borderRadius: '50%',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&.highlight': {
            boxShadow: `0 0 0 2px ${theme.palette.warning.main}`
        }
    }
}));

const Sidebar = () => {
    console.log('SideBar');
    const {screenSize, activeMenu, setActiveMenu, isInsertedHighlighted, insertedCount} = useStateContext();

    const classes = useStyles();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    // Function to check if a link is active
    const location = useLocation();

    const isLinkActive = (link) => {
        return location.pathname.includes(link);
    };

    const normalLink =
        'bg-sky-500/100 text-blue-900 hover:text-black transition-all duration-200 ease-in-out capitalize sidebar_button';
    const activeLink =
        'font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize sidebar_button';

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            to="/"
                            onClick={() => handleCloseSideBar}
                            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <div>
                                <div><img src={UPLogo} alt="fireSpot" style={{marginTop: '5%'}}/></div>
                                <div style={{marginLeft: '10%', marginTop: '2%', textAlign: 'center'}}> PUF
                                    Execution & Evaluation Hub
                                </div>
                            </div>

                        </Link>
                        <TooltipComponent content="Hide Menu" position="BottomCenter">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                                }
                                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                            >
                                <MdOutlineCancel/>
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="mt-10">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-gray-400 underline dark:text-gray-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.path}`}
                                        key={link.name}
                                        onClick={() => {
                                        }}
                                        className="flex items-center gap-5 pl-6 pt-3 pb-2.5"
                                    >
                                        {link['isBadgeVisible'] ? (
                                            <Badge
                                                classes={{
                                                    badge: `${classes.badge} ${
                                                        isInsertedHighlighted && link.path === 'inserted'
                                                            ? 'highlight'
                                                            : ''
                                                    }`
                                                }}
                                                badgeContent={insertedCount}
                                                max={99}
                                                style={{'width': '100%'}}
                                            >
                                                <Card
                                                    className={
                                                        isLinkActive(link.path) ? activeLink : normalLink
                                                    } style={{
                                                    color: '#545453',
                                                    width: '80%',
                                                    paddingLeft: '0',
                                                    borderBottom: '0.25px solid grey',
                                                    padding: '0.5vh',
                                                    hover: {background: 'yellow'}
                                                }}>{link.name}</Card>
                                            </Badge>
                                        ) : (
                                            <Card
                                                text={link.name}
                                                className={
                                                    isLinkActive(link.path) ? activeLink : normalLink
                                                }
                                                sx={{
                                                    ':hover': {
                                                        boxShadow: 800, // theme.shadows[20]
                                                    },
                                                }}
                                                style={{
                                                    color: '#545453',
                                                    width: '80%',
                                                    paddingLeft: '0',
                                                    borderBottom: '0.25px solid grey',
                                                    padding: '0.5vh'
                                                }}
                                            >{link.name}</Card>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;

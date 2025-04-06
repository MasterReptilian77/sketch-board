'use client';

import { useDispatch, useSelector } from 'react-redux';
import styles from './menu.module.css'
import { MENU_ITEMS } from '@/constants';
import { menuItemClick, actionItemClick } from '@/redux/features/menu-slice';

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem)
    const handleMenuClick = (itemName: string) => {
        dispatch(menuItemClick(itemName))
    }

    const handleActionItemClick = (itemName: string) => {
        dispatch(actionItemClick(itemName))
    }

    return(
        <div className={styles.menuContainer}>
            <div title="pencil" className={`${styles.iconWrapper} ${activeMenuItem == MENU_ITEMS.PENCIL ? styles.active: ''}`} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}>
                <img src="assets/icons/ico-pencil.svg" className={styles.icon} alt="pencil" />
            </div>
            <div title="eraser" className={`${styles.iconWrapper} ${activeMenuItem == MENU_ITEMS.ERASER ? styles.active: ''}`} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}>
                <img src="assets/icons/ico-eraser.svg" className={styles.icon} alt="eraser" />
            </div>
            <div title="undo" className={styles.iconWrapper} onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}>
                <img src="assets/icons/ico-rotate-left.svg" className={styles.icon} alt="left" />
            </div>
            <div title="redo" className={styles.iconWrapper} onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}>
                <img src="assets/icons/ico-rotate-right.svg" className={styles.icon} alt="right" />
            </div>
            <div title="download image" className={styles.iconWrapper} onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
                <img src="assets/icons/ico-download.svg" className={styles.icon} alt="download" />
            </div>
        </div>
    )
}

export default Menu;
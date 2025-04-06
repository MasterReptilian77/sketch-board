'use client';

import { useDispatch, useSelector } from 'react-redux';
import { COLORS, MENU_ITEMS } from '@/constants';
import { changeColor, changeBrushWidth } from '@/redux/features/toolbox-slice';

import styles from './toolbox.module.css'

const ToolBox = () => {

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem == MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem == MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER;
    const {color,size} = useSelector((state:any) => state.toolbox[activeMenuItem] || {})

    const updateBrushWidth = (e: any) => { 
        dispatch(changeBrushWidth({item: activeMenuItem, size: e.target.value}))
    }

    const updateColor = (newColor: string) => {
        dispatch(changeColor({item: activeMenuItem, color: newColor}))
    }

    return (
        <div className={styles.toolboxContainer}>
            {showStrokeToolOption &&
                <>
                    <div className={styles.toolboxItem}>
                        <h4 className={styles.toolboxText}>Stroke Color</h4>
                        <div className={styles.itemContainer}>
                            <div className={`${styles.colorBox} ${color == COLORS.BLACK ? styles.active: ''}`} style={{ backgroundColor: COLORS.BLACK }} onClick={() => updateColor(COLORS.BLACK)}/>
                            <div className={`${styles.colorBox} ${color == COLORS.RED ? styles.active: ''}`} style={{ backgroundColor: COLORS.RED }} onClick={() => updateColor(COLORS.RED)}/>
                            <div className={`${styles.colorBox} ${color == COLORS.GREEN ? styles.active: ''}`} style={{ backgroundColor: COLORS.GREEN }} onClick={() => updateColor(COLORS.GREEN)}/>
                            <div className={`${styles.colorBox} ${color == COLORS.BLUE ? styles.active: ''}`} style={{ backgroundColor: COLORS.BLUE }} onClick={() => updateColor(COLORS.BLUE)}/>
                            <div className={`${styles.colorBox} ${color == COLORS.ORANGE ? styles.active: ''}`} style={{ backgroundColor: COLORS.ORANGE }} onClick={() => updateColor(COLORS.ORANGE)}/>
                            <div className={`${styles.colorBox} ${color == COLORS.YELLOW ? styles.active: ''}`} style={{ backgroundColor: COLORS.YELLOW }} onClick={() => updateColor(COLORS.YELLOW)}/>
                        </div>
                    </div>
                </>}

            {showBrushToolOption &&
                <>
                    <div className={styles.toolboxItem}>
                        <h4 className={styles.toolboxText}>Brush Width ({size})</h4>
                        <div className={styles.itemContainer}>
                            <input type="range" min={1} max={20} step={1} onChange={updateBrushWidth} value={size} />
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default ToolBox;
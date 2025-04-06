'use client';

import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from '@/redux/features/menu-slice';

function Board() {

    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const drawHistory = useRef<any>([]);
    const historyPointer = useRef(0);
    const shouldDraw = useRef<boolean>(false);
    const {activeMenuItem, actionMenuItem} = useSelector((state: any) => state.menu);
    const { color, size } = useSelector((state: any) => state.toolbox[activeMenuItem]);

    useEffect(()=>{
        if (!canvasRef.current) return;
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (actionMenuItem == MENU_ITEMS.DOWNLOAD){
            const URL = canvas.toDataURL();
            const a = document.createElement('a');
            a.href = URL;
            a.download = 'sketch.jpg';  // png will not work
            a.click();
        }else if (actionMenuItem == MENU_ITEMS.UNDO || actionMenuItem == MENU_ITEMS.REDO){
            if (historyPointer.current >= 0 && actionMenuItem == MENU_ITEMS.UNDO){
                historyPointer.current -= 1;
            }
            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem == MENU_ITEMS.REDO){
                historyPointer.current += 1;
            }

            if (historyPointer.current == -1){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }else{
                const imageData = drawHistory.current[historyPointer.current];
                ctx.putImageData(imageData, 0, 0);
            }
        }
        dispatch(actionItemClick(null));    // to download again and again
    },[actionMenuItem])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const changeConfig = () => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
        }

        changeConfig();
    }, [color, size])

    // it runs before useEffect becoz we are setting width and height 
    useLayoutEffect(() => {
        if (!canvasRef.current) return;

        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // when mounting
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const startDrawing = (x: number,y: number) => {
            ctx.beginPath();
            ctx.moveTo(x, y);       // start drawing from where mouse is located
        }

        const drawLine = (x: number,y: number) => {
            ctx.lineTo(x, y);       // add line till mouse is moving  (beginPath, moveTo, lineTo, stroke) all four wil combine to used to draw on canvas
            ctx.stroke();
        }

        const handleMouseDown = (e: React.MouseEvent) => {
            shouldDraw.current = true;
            startDrawing(e.clientX,e.clientY);
        }
        const handleMouseMove = (e: React.MouseEvent) => {
            if (!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY);

        }
        const handleMouseUp = () => {
            shouldDraw.current = false;


            const imageData: any = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;

        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }

    }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board
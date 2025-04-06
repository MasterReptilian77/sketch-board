import Board from "@/components/board/board";
import Menu from "@/components/menu/menu";
import ToolBox from "@/components/toolbox/toolbox";

function Home() {
    return (
        <>
            <Menu />
            <ToolBox />
            <Board /> 
        </>
    )
}

export default Home;
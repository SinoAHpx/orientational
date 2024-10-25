import ClassesViewer from "./ClassesView";
import HomeBar from "./HomeBar";

export default function Home() {
    return <>
        <HomeBar style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            width: '98vw',
            height: '75px',
            margin: 'auto',
        }}></HomeBar>
        <ClassesViewer style={{
            marginTop: '10px',
            overflowX: 'auto',
            height: 'calc(100vh - 115px)',
        }}></ClassesViewer>
    </>;
}

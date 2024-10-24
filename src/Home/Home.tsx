import HomeBar from "./HomeBar";

export default function Home() {
    return <>
        <HomeBar style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '98vw',
        }}></HomeBar>
    </>;
}

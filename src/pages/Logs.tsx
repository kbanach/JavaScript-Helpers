import React from "react";
import { Container } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { LogVars } from "../components/LogVars";
import { Output } from "../components/Output";
import { Comment } from "../components/Comment";
import { Presets } from "../components/Presets";
import { Settings } from "../components/Settings";

export const Logs = () => (<>
    <Container>
        <h1>JS Development helpers</h1>
        <Presets />
        <Settings />
        <LogVars />
        <Comment />
        <Output />
        <Footer />
    </Container>
</>);
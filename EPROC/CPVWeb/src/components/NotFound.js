
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import { Routes } from "../routing/routes";
import NotFoundImage from "../assets/img/illustrations/404.svg";
import i18next from "../translations/i18nConfigInstance";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} to={Routes.HomePage.path}>
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">
                  <span className="fw-bolder">{i18next.t("specialPages.notFoundTitle")}</span>
                </h1>
                <p className="lead my-4">
                  {i18next.t("specialPages.notFoundDescription")}
            </p>
                <Button as={Link} variant="primary" className="animate-hover" to={Routes.HomePage.path}>
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  {i18next.t("generic.goBackToHomePage")}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

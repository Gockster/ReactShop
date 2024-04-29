import React from 'react';
import {Row, Col, Card, Accordion, Badge} from '@themesberg/react-bootstrap';

const AccordionItem = (item) => {
    const {eventKey, title, description, component = null, subtitle, disabled = false, visible = true} = item;

    return (
        <>
            {visible &&
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Button variant="link" className="w-100 d-flex justify-content-between" disabled={disabled}>

                    <Row>
                        <Col xs={9}>
                          <span className="h5 mb-0 fw-bold">
                            {title}
                          </span>
                        </Col>
                        <Col xs={3}>
                            <Badge bg="danger" className="badge-lg">{subtitle}</Badge>
                        </Col>
                    </Row>

                </Accordion.Button>
                <Accordion.Body>
                    <Card.Body className="py-2 px-0">
                        {component}
                        {!component &&
                        <Card.Text className="mb-0">
                            {description}
                        </Card.Text>}
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
            }
        </>
    );
};

type Props = {
    defaultKey: String,
    data: Array,
    className: String
};

class AccordionComponent extends React.Component<Props> {
    render() {
        const {
            defaultKey,
            data = [],
            className = ""
        } = this.props;

        return (
            <Accordion className={className} defaultActiveKey={defaultKey}>
                {data.map(rowData => <AccordionItem key={`accordion-${rowData.id}`} {...rowData} />)}
            </Accordion>
        )
    }
}

export default AccordionComponent;
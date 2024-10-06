package net.javaguides.orderservice.config;

import ch.qos.logback.core.boolex.EvaluationException;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfigTopic {

    @Value("${spring.kafka.topic.name}")
    private String topicName;

    // spring bean for kafka topic
    @Bean
    public NewTopic topic() {
        return TopicBuilder.name(topicName)
//                .partitions(3)
                .build();
    }
}

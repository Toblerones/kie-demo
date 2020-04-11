package cn.tobs.drools.repository;

import cn.tobs.drools.repository.dao.DreRule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DreRuleRepository extends JpaRepository<DreRule, Long> {

    DreRule findByKey(String key);
}

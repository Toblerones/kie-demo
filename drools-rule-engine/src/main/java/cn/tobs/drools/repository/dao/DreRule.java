package cn.tobs.drools.repository.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class DreRule implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private Long id;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(String lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Column(nullable = false, unique = true)
    private String key;
    @Column(nullable = false)
    private String content;
    @Column(nullable = true, unique = true)
    private String lastUpdateTime;
    @Column(nullable = false)
    private String createTime;

    @Override
    public String toString() {
        return "DreRule{" +
                "id=" + id +
                ", key='" + key + '\'' +
                ", content='" + content + '\'' +
                ", lastUpdateTime='" + lastUpdateTime + '\'' +
                ", createTime='" + createTime + '\'' +
                '}';
    }
}

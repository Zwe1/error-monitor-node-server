// sql queries
// import config from "../config/default";

/**
 * 注意:
 * 1. 表名带引号为小写，不带默认大写
 * 2. 列名带引号为小写，不带默认大写
 * 3. 字段类型标注需要大写
 * 4. 建表语句末尾不能加逗号
 * 5. mysql 8.0.18 varchar 最大长度 max = 21845
 * 6. 默认取时间戳 current_timestamp
 * 7. 长文本不适合用char来存储，可以选择使用txt类型
 */
module.exports = {
  createTable: tb => `create table if not exists ${tb}(
      id int primary key auto_increment,
      user_id varchar(255) not null,
      user_name varchar(255) not null,
      tenant varchar(255) not null,
      timestamp datetime default now(),
      col int(1),
      line int(1),
      filename varchar(255) ,
      message varchar(255) not null,
      stack text not null,
      type varchar(255) not null,
      sourcemap text
    ) engine=InnoDB auto_increment=0 default charset=utf8`,
  //   createTable: () => `create table if not exists todos(
  //     id int primary key auto_increment,
  //     title varchar(255)not null,
  //     completed tinyint(1) not null default 0
  // )`,
  all: tb => `SELECT * from ${tb}`,
  writeError: tb => `INSERT INTO ${tb} SET ?`,
  delAll: tb => `del * from ${tb}`
};

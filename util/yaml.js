/**
 * 指定されたパスの Yaml ファイルを読み込みます。
 */
 function loadYamlFile(filename) {
    const fs = require('fs');
    const yaml = require('js-yaml');
    const yamlText = fs.readFileSync(filename, 'utf8');

    return yaml.load(yamlText);
  }
  
  const getDBInfo = () => { 
    const path = require('path');

    try {

      const data = loadYamlFile(path.join('./yaml', 'server.yaml'));

      return data.db;
    } catch (err) {
      return {};
    }
  };

  const getBackendInfo = () => { 
    const path = require('path');

    try {

      const data = loadYamlFile(path.join('./yaml', 'server.yaml'));

      return data.backend;
    } catch (err) {
      return {};
    }
  };

  const getSqlInfo = () => { 
    const path = require('path');

    try {

      const data = loadYamlFile(path.join('./yaml', 'sql.yaml'));

      return data;
    } catch (err) {
      return {};
    }
  };


  const getTradePattern = () => { 
    const path = require('path');

    try {

      const data = loadYamlFile(path.join('./yaml', 'enum.yaml'));

      return data.tradePattern;
    } catch (err) {
      return {};
    }
  };

  const getBunrui = () => { 
    const path = require('path');

    try {

      const data = loadYamlFile(path.join('./yaml', 'enum.yaml'));

      return data.bunrui;
    } catch (err) {
      return {};
    }
  };

  const getWay = () => { 
    const path = require('path');

    try {
      const data = loadYamlFile(path.join('./yaml', 'enum.yaml'));
      return data.way;
    } catch (err) {
      return {};
    }
  };

  exports.getDBInfo = getDBInfo;  
  exports.getBackendInfo = getBackendInfo;  
  exports.getSqlInfo = getSqlInfo;  
  exports.getTradePattern = getTradePattern;  
  exports.getBunrui = getBunrui;  
  exports.getWay = getWay;  

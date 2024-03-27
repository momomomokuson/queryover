(function(){

    let targetKeys = {};
    targetKeys['smnclid'] = '__smnclid';
    targetKeys['squadbeyond_uid'] = '__squadbeyond_uid';
    targetKeys['sb_article_uid'] = '__sb_article_uid';
    targetKeys['sb_tracking'] = '__sb_tracking';

    let querys = {};
    if(location.search){
      let parameters = location.search.substring(1).split('&');
      for (var i = 0; i < parameters.length; i++) {
        let param = parameters[i].split('=');
        querys[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
      }
    }

    let cookies = {}
    if(document.cookie) {
        let parameters = document.cookie.split(';');
        for (var i = 0; i < parameters.length; i++) {
            let param = parameters[i].split('=');
            cookies[decodeURIComponent(param[0].trim())] = decodeURIComponent(param[1].trim());
          }
    }

    let appendQueryCnt = 0;
    Object.keys(targetKeys).forEach(function(k) {
        let queryName = k;
        let cookieName = targetKeys[k];
        if(querys[queryName] == undefined && cookies[cookieName]) {
            querys[queryName] = cookies[cookieName];
            appendQueryCnt++;
        }
    });

    if(appendQueryCnt > 0) {
        if(Object.keys(querys).length > 0) {
            let queryStrs = [];
            Object.keys(querys).forEach(function(k) {
                queryStrs.push(k + '=' + querys[k]);
            });

            history.pushState(null, null, '?' + queryStrs.join('&'));
        }
    }
})();
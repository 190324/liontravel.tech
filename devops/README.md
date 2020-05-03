environment version ubuntu 18.04

## ansible test

```
ansible -m ping all
ansible [host_name] -m ping
```

## 環境變數

## SSL FOR FREE

[turorial](https://andyyou.github.io/2019/04/13/how-to-use-certbot/)

```
sudo apt-get install certbot python-certbot-nginx python3-pip -y
pip3 install certbot-plugin-gandi
sudo chmod 600 gandi.ini (https://github.com/obynio/certbot-plugin-gandi)
sudo certbot certonly -a certbot-plugin-gandi:dns --certbot-plugin-gandi:dns-credentials gandi.ini -d [domain.com] -d \*.[domain.com] --server https://acme-v02.api.letsencrypt.org/directory
```

ssl key file

```
Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/liontravel.tech/fullchain.pem
Your key file has been saved at:
/etc/letsencrypt/live/liontravel.tech/privkey.pem
```

setting crontab for auto extend

```
0 0 * * 0 certbot renew -q -a certbot-plugin-gandi:dns --certbot-plugin-gandi:dns-credentials [gandi/path/ini] --server https://acme-v02.api.letsencrypt.org/directory
```

## DB 連線

mariadb setting user by password login

```
USE mysql;
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
UPDATE user SET Password=PASSWORD("my_password") WHERE User="root";
FLUSH PRIVILEGES;
```

create db

```
CREATE DATABASE [db];
```

import sql file

```
mysql -uroot -p [db] < [db.sql]
```

import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта Юг Профкров на почту владельца."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    area = body.get('area', '').strip()
    object_type = body.get('object_type', '').strip()
    message = body.get('message', '').strip()

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Укажите телефон'}
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'dmitrypechionkin161@mail.ru'
    to_email = 'dmitrypechionkin161@mail.ru'

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
      <div style="background: #0D0F14; border-radius: 12px; padding: 30px; color: #fff;">
        <h2 style="color: #F5A623; margin: 0 0 20px; font-size: 22px;">🏗️ Новая заявка с сайта Юг Профкров</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #7A8099; width: 140px;">Имя</td>
            <td style="padding: 10px 0; color: #E8EAF0;">{name or '—'}</td>
          </tr>
          <tr style="border-top: 1px solid #1E2230;">
            <td style="padding: 10px 0; color: #7A8099;">Телефон</td>
            <td style="padding: 10px 0; color: #F5A623; font-weight: bold;">{phone}</td>
          </tr>
          <tr style="border-top: 1px solid #1E2230;">
            <td style="padding: 10px 0; color: #7A8099;">Площадь</td>
            <td style="padding: 10px 0; color: #E8EAF0;">{area or '—'}</td>
          </tr>
          <tr style="border-top: 1px solid #1E2230;">
            <td style="padding: 10px 0; color: #7A8099;">Тип объекта</td>
            <td style="padding: 10px 0; color: #E8EAF0;">{object_type or '—'}</td>
          </tr>
          {"<tr style='border-top: 1px solid #1E2230;'><td style='padding: 10px 0; color: #7A8099; vertical-align: top;'>Сообщение</td><td style='padding: 10px 0; color: #E8EAF0;'>" + message + "</td></tr>" if message else ""}
        </table>
      </div>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name or phone}'
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    if smtp_password:
        with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
            server.login(from_email, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'ok': True}
    }
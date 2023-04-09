import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SENDER_MAIL = "real.estate.assistant.mos@gmail.com"
PASSWORD = "ejwjsaubdzboruxl"


def send_mail(mail_address: str, head_text: str, body_text: str) -> bool:
    """DON'T TOUCH"""
    recipient_email = mail_address
    # Create a message object instance
    message = MIMEMultipart()
    message['From'] = SENDER_MAIL
    message['To'] = recipient_email
    message['Subject'] = head_text
    body = body_text
    message.attach(MIMEText(body, 'plain'))
    session = smtplib.SMTP('smtp.gmail.com',
                           587)  # use your email service provider's SMTP details
    session.starttls()
    session.login(SENDER_MAIL,
                  PASSWORD)  # replace with your actual email password
    text = message.as_string()
    session.sendmail(SENDER_MAIL, recipient_email, text)
    session.quit()
    return True


def send_event_reminder(mail_address: str, datetime: str,
                        buildings_addresses: str) -> bool:
    """ Отправляет напоминание о встрече:
        mail_address - адрес получателя,
        datetime - дата и время
        buildings_addresses - названия зданий или их адреса через запятую
    """
    body = f"Здравствуйте, я Цифровой Помощник по Недвидимости\n\nНапоминаю о том, что {datetime} у Вас состоится событие, на котором будут обсуждаться вопросы по объектам: {buildings_addresses}."
    return send_mail(mail_address, "Ваш цифровой помощник по недвижимости",
                     body)


def send_event_created(mail_address: str, datetime: str,
                       buildings_addresses: str) -> bool:
    """ Отправляет сообщение о новом событии:
            mail_address - адрес получателя,
            datetime - дата и время
            buildings_addresses - названия зданий или их адреса через запятую
        """
    body = f"Здравствуйте, я Цифровой Помощник по Недвидимости\n\nCоздано событие, которое состоится {datetime}, на событии будут обсуждаться вопросы по объектам: {buildings_addresses}."
    return send_mail(mail_address, "Ваш цифровой помощник по недвижимости",
                     body)

# Generated by Django 4.1.6 on 2023-04-09 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_assignment'),
    ]

    operations = [
        migrations.AddField(
            model_name='manager',
            name='name',
            field=models.CharField(default='abcdefghjkla', max_length=250),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='assignee',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app.manager'),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='status',
            field=models.CharField(choices=[('с', 'закрыт'), ('w', 'в работе'), ('d', 'просрочен')], default='w', max_length=1),
        ),
    ]

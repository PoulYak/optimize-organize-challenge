# Generated by Django 4.1.6 on 2023-04-09 13:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_workgroup_facility_lat_facility_lng_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='facility',
            name='work_group',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='app.workgroup'),
        ),
    ]
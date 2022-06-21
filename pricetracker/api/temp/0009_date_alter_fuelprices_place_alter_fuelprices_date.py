# Generated by Django 4.0.5 on 2022-06-20 02:28

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_fuelplaces_fuelprices_delete_fuel'),
    ]

    operations = [
        migrations.CreateModel(
            name='Date',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date(2022, 6, 20))),
            ],
        ),
        migrations.AlterField(
            model_name='fuelprices',
            name='place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='places', to='api.fuelplaces'),
        ),
        migrations.AlterField(
            model_name='fuelprices',
            name='date',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dates', to='api.date'),
        ),
    ]

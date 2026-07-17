{{/*
Expand the name of the chart.
*/}}
{{- define "my-mongo.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- .Chart.Name }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "my-mongo.labels" -}}
app: {{ include "my-mongo.fullname" . }}
{{- end }}
